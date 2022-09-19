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