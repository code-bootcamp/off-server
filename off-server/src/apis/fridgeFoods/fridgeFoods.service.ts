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

  async createFood({fridgeFoodInput, userId}){
    // user의 냉장고 번호 찾기
    const myFridge = await this.fridgesService.findOne(userId)

    return await this.fridgeFoodRepository.save({
      fridge: myFridge.id,
      ...fridgeFoodInput
    })
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