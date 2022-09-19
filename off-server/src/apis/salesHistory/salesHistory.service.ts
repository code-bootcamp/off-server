import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SalesHistory } from "./entities/salesHistory.entity";

@Injectable()
export class SalesHistoryService {
  constructor(
    @InjectRepository(SalesHistory)
    private readonly salesHistoryRepository: Repository<SalesHistory>
  ){}

  async findAll({ userId }){
    const result = await this.salesHistoryRepository.find({
      where: {user: {id: userId}},
      relations: ['board']
    })

    console.log(result)
    return result;
  }

  async create({userId, boardId}){
    await this.salesHistoryRepository.save({
      user: userId,
      board: boardId
    })
  }

  async delete({boardId}){
    return await this.salesHistoryRepository.softDelete({board: {id: boardId}})
  }
}