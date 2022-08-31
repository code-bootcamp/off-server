import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IUser } from 'src/commons/type/context';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Mutation(() => Board)
  async createBoard(
    @Context() iUser: IUser,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    return this.boardsService.create({
      createBoardInput,
      email: iUser.user.email,
    });
  }
}
