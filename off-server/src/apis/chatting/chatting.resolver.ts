import { UseGuards } from "@nestjs/common";
import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { ChattingService } from "./chatting.service";
import { Chat } from "./entities/chat.entity";

@Resolver()
export class ChattingResolver {
  constructor(
    private readonly chattingService: ChattingService, //
  ){}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Chat])
  async fetchMyChattingList(
    @Context() context: IContext, //
  ){
    return await this.chattingService.findMyChatList({userId: context.req.user.id})
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Chat])
  async fetchChatHistory(
    @Args('chatRoodId') chatRoodId: string, //
  ){
    return await this.chattingService.findBoardChat({chatRoodId})
  }

}