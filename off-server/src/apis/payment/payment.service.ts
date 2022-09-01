import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { IamportService } from "../iamport/iamport.service";
import { Point } from "../points/entities/point.entity";
import { PointsService } from "../points/points.service";
import { Payment, POINT_TRANSACTION_STATUS_ENUM } from "./entities/payment.entity";

@Injectable()
export class PaymentService{
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly pointsService: PointsService,
    private readonly dataSource: DataSource,
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
    private readonly iamportService: IamportService
  ){}
  
  // transaction
  async createPoint({ userId, impUid, amount, merchantUid }){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try{
      const paymentTransaction = this.paymentRepository.create({
        impUid,
        amount,
        user: userId,
        merchantUid,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT
      })
      
      await queryRunner.manager.save(paymentTransaction)

      // 기존 유저 포인트 찾기
      const user = await queryRunner.manager.findOne(
        Point, { 
          where: { user: { id: userId } },
          lock: { mode: 'pessimistic_write'} 
        },
      )

      let updatePoint: Point;
      if (!user) {
        updatePoint = this.pointRepository.create({
          user: userId,
          point: amount
        })
      } else {
        updatePoint = this.pointRepository.create({
          ...user,
          id: user.id,
          point: user.point + amount
        })
      }

      

      await queryRunner.manager.save(updatePoint)
      await queryRunner.commitTransaction();

      return paymentTransaction

    } catch(error) {
      // 오류시 결제 취소시키기 
      const checksum = amount
      const reason = "결제 오류"
      const iamportToken = await this.iamportService.getIamportToken()

      await queryRunner.rollbackTransaction();
      await this.iamportService.cancelPay({ iamportToken, impUid, amount, checksum, reason })
    } finally {
      await queryRunner.release();
    }
  }

}