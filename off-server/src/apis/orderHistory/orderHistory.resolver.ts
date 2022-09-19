import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { OrderHistory } from "./entities/orderHistory.entity";
import { OrderHistoryService } from "./orderHistory.service";

@Resolver()
export class OrderHistoryResolver {
  constructor(
    private readonly orderHistoryService: OrderHistoryService, //
  ){}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [OrderHistory])
  async fetchOrderHistory(
    @Context() context: IContext,
  ){
    return await this.orderHistoryService.findAll({userId: context.req.user.id})
  }
}