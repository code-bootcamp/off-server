import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { IContext } from "src/commons/type/context";
import { CreateFridgeFoodInput } from "./dto/createFridgeFood.input";
import { FridgeFood } from "./entities/fridgeFood.entity";
import { FridgeFoodsService } from "./fridgeFoods.service";

@Resolver()
export class FridgeFoodsResolver {
  constructor(
    private readonly fridgeFoodsService: FridgeFoodsService,
  ){}

  // 냉장고에 음식 등록하기
  // userGuard 등록시키기
  @Mutation(() => FridgeFood)
  createFridgeFood(
    @Args('fridgeFoodInput') fridgeFoodInput: CreateFridgeFoodInput,
    @Args('userId') userId: string,
    @Context() context: IContext
  ){
    // const userId = context.req.user.id
    return this.fridgeFoodsService.createFood({fridgeFoodInput, userId})
  }
}