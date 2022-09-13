import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Fridge } from "./entities/fridges.entity";

@Injectable()
export class FridgesService {
  constructor(
    @InjectRepository(Fridge)
    private readonly fridgeRepository: Repository<Fridge>
  ){}

  async findOne({userId}){
    return await this.fridgeRepository.findOne({
      where: {user: {id: userId}},
    })
  }

  async create({userId}){
    await this.fridgeRepository.save({user: userId})
  }
}