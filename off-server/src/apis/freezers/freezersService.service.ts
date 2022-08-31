import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Freezer } from "./entities/freezer.entity";

@Injectable()
export class FreezerService{
  constructor(
    @InjectRepository(Freezer)
    private readonly freezerRepository: Repository<Freezer>
  ){}

  async findOne({userId}){
    return await this.freezerRepository.findOne({where: {user: userId}})
  }

  async create({userId}){
    await this.freezerRepository.save({user: userId})
  }

}