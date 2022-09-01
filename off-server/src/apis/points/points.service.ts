import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { read } from "fs";
import { Repository } from "typeorm";
import { Point } from "./entities/point.entity";

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>
  ){}

  async createPoint({userId, point}){
    return await this.pointRepository.save({
      user: userId,
      point
    })
  }
  
}