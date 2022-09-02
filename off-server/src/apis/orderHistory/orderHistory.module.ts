import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { User } from '../users/entities/user.entity';
import { OrderHistory } from './entities/orderHistory.entity';
import { OrderHistoryService } from './orderHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHistory, Board, User])],
  providers: [
    OrderHistoryService,
  ]
})
export class OrderHistoryModule {}
