import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board, Board_STATUS_ENUM } from './entities/board.entity';
import { GraphQLJSONObject } from 'graphql-type-json';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  // @Query(() => [Board])
  // async searchBoards(@Args({ name: 'search', nullable: true }) search: string) {
  //   const mycache = await this.cacheManager.get(search);
  //   if (mycache) {
  //     console.log('cache!!!!!!!!!!!!!!!!!!!!!!!!!!!!', mycache);

  //     return mycache;
  //   }
  //   const result = await this.elasticsearchService.search({
  //     index: 'off',
  //     query: {
  //       match: { title: search },
  //     },
  //   });
  //   console.log('result!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', result);
  //   const boards = result.hits.hits.map((ele) => ele._source);
  //   await this.cacheManager.set(search, boards, { ttl: 60 });
  //   return boards;
  // }

  @Query(() => GraphQLJSONObject)
  async fetchBoardTitle(@Args('title') title: string) {
    return this.boardsService.elasticsearchTitle({ title });
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
