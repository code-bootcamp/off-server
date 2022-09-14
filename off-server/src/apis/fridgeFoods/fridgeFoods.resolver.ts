import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { FridgesService } from "../fridges/fridges.service";
import { CreateFridgeFoodInput } from "./dto/createFridgeFood.input";
import { UpdateFridgeFoodInput } from "./dto/updateFridgeFood.input";
import { FridgeFood, FRIDGE_STATUS_ENUM } from "./entities/fridgeFood.entity";
import { FridgeFoodsService } from "./fridgeFoods.service";

@Resolver()
export class FridgeFoodsResolver {
  constructor(
    private readonly fridgeFoodsService: FridgeFoodsService,
    private readonly fridgesService: FridgesService
  ){}

  /*
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [FridgeFood])
  async fetchCreatedFridgeFoods(
    @Context() context: IContext, //
  ){
    const userId = context.req.user.id
    return await this.fridgeFoodsService.findAllNull({userId}) 
  }
  */

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [FridgeFood])
  async fetchFridgeFoods(
    @Context() context: IContext, //
    @Args({name: 'page', type: () => Int, nullable: true}) page: number,
    @Args({name: 'status', nullable: true}) status: FRIDGE_STATUS_ENUM,
  ){
    if (!page) page = 1
    const userId = context.req.user.id
    return await this.fridgeFoodsService.findAll({userId, page, status}) 
  }

  // 냉장고에 음식 등록하기
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => FridgeFood)
  async createFridgeFood(
    @Args('fridgeFoodInput') fridgeFoodInput: CreateFridgeFoodInput,
    @Args({name: 'status'}) status: FRIDGE_STATUS_ENUM,
    @Context() context: IContext
  ){
    const userId = context.req.user.id
    return await this.fridgeFoodsService.createFood({fridgeFoodInput, userId, status})
  }

  // 음식 수정
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async updateFridgeFoods(
    @Context() context: IContext, 
    @Args('fridgeFoodId') fridgeFoodId: string,
    @Args('updateFridgeFoodInput') updateFridgeFoodInput: UpdateFridgeFoodInput,
    @Args('status') status: FRIDGE_STATUS_ENUM,
  ) {
    const userId = context.req.user.id
   
    await this.fridgeFoodsService.updateFood({updateFridgeFoodInput, userId, fridgeFoodId, status})
    return '수정완료'
  }

  // 음식 삭제
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteFridgeFood(
    @Args('foodId') id: string, //
    @Args('fridgeId') fridgeId: string,
    @Context() context: IContext
    ){
    const foodId = id
    const userId = context.req.user.id
    
    return await this.fridgeFoodsService.deleteFood({fridgeId, foodId, userId})
  }
}