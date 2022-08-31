import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext, IUser } from 'src/commons/type/context';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

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
    return await this.boardsService.update({
      updateBoardInput,
      userId,
      boardId,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteBoard(@Context() context: IContext, @Args('id') id: string) {
    const userId = context.req.user.id;
    return await this.boardsService.delete({ id, userId });
  }
}
