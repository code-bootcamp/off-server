import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { Payment } from "./entities/payment.entity";
import { PaymentService } from "./payment.service";

@Resolver()
export class PaymentResolver{
  constructor(
    private readonly paymentService: PaymentService
  ){}
  
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async pointCharge(
    @Context() context: IContext,
    @Args('impUid') impUid: string,
    @Args('merchantUid') merchantUid: string,
    @Args({name: 'amount', type: () => Int}) amount: number
  ){
    const userId = context.req.user.id
    return await this.paymentService.createPoint({ userId, impUid, amount, merchantUid })
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async buyItem(
    @Args('boardId') boardId: string,
    @Args({name: 'price', type: () => Int}) price: number,
    @Context() context: IContext
  ) {
    const userId = context.req.user.id
    this.paymentService.buyItem({boardId, price, userId})
  }
}
