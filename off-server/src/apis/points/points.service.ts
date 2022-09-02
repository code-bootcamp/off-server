import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { IamportService } from "../iamport/iamport.service";
import { Point } from "./entities/point.entity";

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
    private readonly dataSource: DataSource,
    private readonly iamportService: IamportService
  ){}

  async createPoint({userId, point}){
    return await this.pointRepository.save({
      user: userId,
      point
    })
  }

  // 포인트 찾고 저장시키기.
  async createPointFindSave({userId, amount, status, impUid}) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try{
      console.log(status)
      // 기존 유저 포인트 찾기
      const user = await queryRunner.manager.findOne(
        Point, { 
          where: { user: { id: userId } },
          lock: { mode: 'pessimistic_write'} 
        },
      )

      let changePoint: number;
      console.log("pointService", user, status)
      if (status === "minus") {
        if (user.point < amount || !user) {
          throw new UnprocessableEntityException('포인트가 부족합니다.')
        } else {
          changePoint = user.point - amount
        }
      } else if (status === "plus") {
        if (!user) {
          changePoint = amount
        } else {
          changePoint = user.point + amount
        }
      }

      const updatePoint = this.pointRepository.create({
        ...user,
        user: userId,
        point: changePoint
      })

      await queryRunner.manager.save(updatePoint)
      await queryRunner.commitTransaction();

      return updatePoint;

    } catch(error) {
      await queryRunner.rollbackTransaction();
      
      if (impUid !== "false") {
        const checksum = amount
        const reason = "결제 오류"
        const iamportToken = await this.iamportService.getIamportToken()
        
        await this.iamportService.cancelPay({ iamportToken, impUid, amount, checksum, reason })
      } 
    } finally {
      await queryRunner.release();
    }
  }


  
}