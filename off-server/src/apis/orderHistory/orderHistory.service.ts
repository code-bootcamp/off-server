import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderHistory } from "./entities/orderHistory.entity";

@Injectable()
export class OrderHistoryService {
  constructor(
    @InjectRepository(OrderHistory)
    private readonly orderHistoryRepository: Repository<OrderHistory>
  ){}

  async find({boardId}){
    return await this.orderHistoryRepository.findOne({
      where: {board: {id: boardId}}
    })
  }

  async create({userId, boardId}){
    await this.orderHistoryRepository.save({
      user: userId,
      board: boardId,
    })
  }

  async delete({boardId}){
    return await this.orderHistoryRepository.softDelete({board: {id: boardId}})
  }
}