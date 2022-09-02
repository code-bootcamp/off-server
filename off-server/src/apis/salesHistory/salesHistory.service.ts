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

  create({userId, boardId, price}){
    this.salesHistoryRepository.create({
      user: userId,
      board: boardId,
      price
    })
  }
}