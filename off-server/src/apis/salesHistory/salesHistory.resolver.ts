import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { SalesHistory } from "./entities/salesHistory.entity";
import { SalesHistoryService } from "./salesHistory.service";

@Resolver()
export class SalesHistoryResolver {
  constructor(
    private readonly salesHistoryService: SalesHistoryService,
  ){}
  
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [SalesHistory])
  async fetchSalseHistory(
    @Context() context:IContext,
  ){
    const userId = context.req.user.id;
    return await this.salesHistoryService.findAll({userId})
  }
}