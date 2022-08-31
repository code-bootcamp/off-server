import { UnprocessableEntityException, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { FridgesService } from "../fridges/fridges.service";
import { CreateFridgeFoodInput } from "./dto/createFridgeFood.input";
import { FridgeFood } from "./entities/fridgeFood.entity";
import { FridgeFoodsService } from "./fridgeFoods.service";

@Resolver()
export class FridgeFoodsResolver {
  constructor(
    private readonly fridgeFoodsService: FridgeFoodsService,
    private readonly fridgesService: FridgesService
  ){}

  // 냉장고에 음식 등록하기
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => FridgeFood)
  createFridgeFood(
    @Args('fridgeFoodInput') fridgeFoodInput: CreateFridgeFoodInput,
    @Context() context: IContext
  ){
    const userId = context.req.user.id
    return this.fridgeFoodsService.createFood({fridgeFoodInput, userId})
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteFood(
    @Args('foodId') id: string, //
    @Args('fridgeId') fridgeId: string,
    @Context() context: IContext
    ){
    const foodId = id
    const userId = context.req.user.id
    
    return await this.fridgeFoodsService.deleteFood({fridgeId, foodId, userId})
  }
}