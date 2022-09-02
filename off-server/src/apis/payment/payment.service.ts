import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BoardsService } from "../boards/boards.service";
import { UpdateBoardInput } from "../boards/dto/updateBoard.input";
import { Board } from "../boards/entities/board.entity";
import { IamportService } from "../iamport/iamport.service";
import { OrderHistory } from "../orderHistory/entities/orderHistory.entity";
import { PointsService } from "../points/points.service";
import { SalesHistory } from "../salesHistory/entities/salesHistory.entity";
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
    @InjectRepository(SalesHistory)
    private readonly salesHistoryRepository: Repository<SalesHistory>,
    @InjectRepository(OrderHistory)
    private readonly orderHistoryRepository: Repository<OrderHistory>,
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
      // 상품 isSoldout true update
      // 상품 lock 걸기
      const board = await queryRunner.manager.findOne(Board, {
        where: {id: boardId}, 
        lock: {mode: 'pessimistic_write'}
      })

      const updateBoardInput = new UpdateBoardInput()
      this.boardsService.update({userId: board.user.id, updateBoardInput, boardId})

      // 내 구매 리스트에 추가하기
      this.orderHistoryRepository.create({
        board: boardId,
        price,
        user: userId
      })

      // 판매자 판매 리스트에 추가하기
      this.salesHistoryRepository.create({
        board: boardId,
        price,
        user: userId
      })

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