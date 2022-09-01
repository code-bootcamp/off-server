import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';

import { Point } from './entities/point.entity';
import { PointsService } from './points.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Point, //
    User
  ])],
  providers: [
    PointsService, //
  ]
})
export class PointsModule {}
