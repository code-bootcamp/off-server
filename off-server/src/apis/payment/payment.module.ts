import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IamportService } from "../iamport/iamport.service";
import { Point } from "../points/entities/point.entity";
import { PointsService } from "../points/points.service";
import { User } from "../users/entities/user.entity";
import { Payment } from "./entities/payment.entity";
import { PaymentResolver } from "./payment.resolver";
import { PaymentService } from "./payment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      User,
      Point
    ]),
    HttpModule
  ],
  providers: [
    PaymentResolver,
    PaymentService,
    IamportService,
    PointsService
  ]
})

export class PaymentModule{}