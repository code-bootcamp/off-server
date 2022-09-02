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

  async create({userId, boardId, price}){
    await this.orderHistoryRepository.save({
      user: userId,
      board: boardId,
      price
    })
  }
}