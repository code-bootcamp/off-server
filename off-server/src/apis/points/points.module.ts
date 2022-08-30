import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';

import { Point } from './entities/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point, User])],
})
export class PointsModule {}
