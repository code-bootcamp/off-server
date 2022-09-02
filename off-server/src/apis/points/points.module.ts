import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';

import { User } from '../users/entities/user.entity';

import { Point } from './entities/point.entity';
import { PointsService } from './points.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Point, //
    User,
    HttpService,
  ]),
  HttpModule
],
  providers: [
    PointsService, //
    IamportService
  ]
})
export class PointsModule {}
