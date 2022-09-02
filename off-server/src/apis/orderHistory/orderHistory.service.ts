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

  create({userId, boardId, price}){
    this.orderHistoryRepository.create({
      user: userId,
      board: boardId,
      price
    })
  }
}