import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BoardsService } from "../boards/boards.service";
import { UpdateBoardInput } from "../boards/dto/updateBoard.input";
import { Board, Board_STATUS_ENUM } from "../boards/entities/board.entity";
import { IamportService } from "../iamport/iamport.service";
import { OrderHistory } from "../orderHistory/entities/orderHistory.entity";
import { OrderHistoryService } from "../orderHistory/orderHistory.service";
import { PointsService } from "../points/points.service";
import { SalesHistory } from "../salesHistory/entities/salesHistory.entity";
import { SalesHistoryService } from "../salesHistory/salesHistory.service";
import { Payment, POINT_TRANSACTION_STATUS_ENUM } from "./entities/payment.entity";

@Injectable()
export class PaymentService{
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly pointsService: PointsService,
    private readonly dataSource: DataSource,
    private readonly iamportService: IamportService,
    private readonly boardsService: BoardsService, 
    private readonly orderHistoryService: OrderHistoryService,
    private readonly salesHistoryService: SalesHistoryService

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
     
      await queryRunner.commitTransaction();
     
      await this.pointsService.createPointFindSave({userId, amount, status: "plus", impUid} )
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


  async buyItem({boardId, price, userId}){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const board = await queryRunner.manager.findOne(Board, {
        where: {id: boardId}, 
        lock: {mode: 'pessimistic_write'}
      })

      let updateBoardInput = new UpdateBoardInput()
      updateBoardInput = {...board}
      const status = Board_STATUS_ENUM.SOLDOUT
      // this.boardsService.update({
      //   userId: board.user.id,  
      //   boardId,
      //   updateBoardInput,
      //   status
      // })

      this.orderHistoryService.create({userId, boardId, price})

      // 판매자 판매 리스트에 추가하기
      this.salesHistoryService.create({userId, boardId, price})
      // 나의 포인트 감소
      await this.pointsService.createPointFindSave({userId, amount: price, status: "minus", impUid: "false"})
      // 판매자에게 포인트 주기
      const userBoard = await this.boardsService.findOne({id: boardId})
      await this.pointsService.createPointFindSave({userId: userBoard.user.id, amount: price, status: "plus", impUid: "false"})

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

  }

  

}