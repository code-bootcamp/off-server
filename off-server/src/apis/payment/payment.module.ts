import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsService } from "../boards/boards.service";
import { Board } from "../boards/entities/board.entity";
import { BoardsImage } from "../boardsImages/entities/boardsImage.entity";
import { IamportService } from "../iamport/iamport.service";
import { OrderHistory } from "../orderHistory/entities/orderHistory.entity";
import { OrderHistoryService } from "../orderHistory/orderHistory.service";
import { Point } from "../points/entities/point.entity";
import { PointsService } from "../points/points.service";
import { SalesHistory } from "../salesHistory/entities/salesHistory.entity";
import { SalesHistoryService } from "../salesHistory/salesHistory.service";
import { SalesLocations } from "../salesLocations/entities/salesLocation.entity";
import { User } from "../users/entities/user.entity";
import { Payment } from "./entities/payment.entity";
import { PaymentResolver } from "./payment.resolver";
import { PaymentService } from "./payment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      User,
      Point,
      Board,
      SalesHistory,
      OrderHistory,
      SalesLocations,
      BoardsImage
    ]),
    HttpModule
  ],
  providers: [
    PaymentResolver,
    PaymentService,
    IamportService,
    PointsService,
    BoardsService,
    OrderHistoryService,
    SalesHistoryService
  ]
})

export class PaymentModule{}