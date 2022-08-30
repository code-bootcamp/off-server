import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { SalesLocation } from './entities/salesLocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesLocation, Board])],
})
export class SalesLocationsModule {}
