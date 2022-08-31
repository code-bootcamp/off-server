import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Args } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FridgesService } from "../fridges/fridges.service";
import { FridgeFood } from "./entities/fridgeFood.entity";

@Injectable()
export class FridgeFoodsService {
  constructor(
    @InjectRepository(FridgeFood)
    private readonly fridgeFoodRepository: Repository<FridgeFood>,
    private readonly fridgesService: FridgesService
  ){}

  async findAll({fridgeId}){
    const result = await this.fridgeFoodRepository.find({
      where: {fridge: {id: fridgeId}},
      relations: ['fridge', 'category']
    })

    return result
  }

  async createFood({fridgeFoodInput, userId}){
    // user의 냉장고 번호 찾기
    const myFridge = await this.fridgesService.findOne(userId)

    return await this.fridgeFoodRepository.save({
      fridge: myFridge.id,
      ...fridgeFoodInput
    })
  }

  async updateFood({updateFridgeFoodInput, userId, fridgeFoodId}){
    const myFood = await this.fridgeFoodRepository.findOne({where: {id: fridgeFoodId}})

    const result = await this.fridgeFoodRepository.save({
      ...myFood,
      id: fridgeFoodId,
      ...updateFridgeFoodInput
    })

    console.log(result)
    return result;

  }

  async deleteFood({fridgeId, foodId, userId}){
    // user의 냉장고음식인지 check
    const fridge = await this.fridgesService.findOne(userId)

    if (fridgeId !== fridge.id) {
      throw new UnprocessableEntityException('권한이 없습니다.')
    }

    const result = await this.fridgeFoodRepository.softDelete({id: foodId})
    return result.affected ? true : false
  }
}