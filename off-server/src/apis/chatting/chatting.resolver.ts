import { UseGuards } from "@nestjs/common";
import { Args, Context, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { ChattingService } from "./chatting.service";

@Resolver()
export class ChattingResolver{
  constructor(
    private readonly chatService: ChattingService, //
  ){}

  @UseGuards(GqlAuthAccessGuard)
  fetchMyChatList(
    @Context() context: IContext ,//
  ){
    const userId = context.req.user.id
    return this.chatService.findMyChat({userId})
  }

  @UseGuards(GqlAuthAccessGuard)
  fetchBoardChat(
    @Args('boardId') boardId: string, //
  ){
    return this.chatService.findBoardChat({ boardId })
  }

  @UseGuards(GqlAuthAccessGuard)
  async createBoardChat(
    @Args('boardId') boardId: string, //
    @Args('message') message: string, 
    @Context() context: IContext,
  ){
    const userId = context.req.user.id;
    return await this.chatService.createChat( {userId, boardId, message} )
  }
}