import { Injectable } from "@nestjs/common";
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
}