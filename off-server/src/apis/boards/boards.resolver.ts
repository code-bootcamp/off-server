import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board, Board_STATUS_ENUM } from './entities/board.entity';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Category } from '../category/entities/category.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}
  @Query(() => GraphQLJSONObject)
  async fetchBoardTitle(
    @Args({ name: 'title', nullable: true }) title: string,
  ) {
    return this.boardsService.elasticsearchTitle({ title });
  }
  @Query(() => GraphQLJSONObject)
  async fetchBoardCategory(
    @Args({ name: 'category', nullable: true }) category: string,
  ) {
    return this.boardsService.elasticsearchCategory({ category });
  }
  @Query(() => GraphQLJSONObject)
  async fetchBoardLocation(
    @Args({ name: 'location', nullable: true }) location: string,
  ) {
    return this.boardsService.elasticsearchLocation({ location });
  }

  @Query(() => [Board])
  fetchBoards() {
    return this.boardsService.findAll();
  }
  @Query(() => Board)
  fetchBoard(@Args('id') id: string) {
    return this.boardsService.findOne({ id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async createBoard(
    @Context() context: IContext,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    const userId = context.req.user.id;
    return this.boardsService.create({
      createBoardInput,
      userId,
    });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async updateBoard(
    @Context() context: IContext,
    @Args('boardId') boardId: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ) {
    const userId = context.req.user.id;
    const status = Board_STATUS_ENUM.SALE;
    return await this.boardsService.update({
      updateBoardInput,
      userId,
      boardId,
      status,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteBoard(
    @Context() context: IContext,
    @Args('boardId') boardId: string,
  ) {
    const userId = context.req.user.id;
    return await this.boardsService.delete({ boardId, userId });
  }
}
