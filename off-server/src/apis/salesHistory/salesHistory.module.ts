import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { User } from '../users/entities/user.entity';
import { SalesHistory } from './entities/salesHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesHistory, User, Board])],
})
export class SalesHistoryModule {}
