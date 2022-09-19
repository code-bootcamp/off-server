import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { User } from '../users/entities/user.entity';
import { SalesHistory } from './entities/salesHistory.entity';
import { SalesHistoryResolver } from './salesHistory.resolver';
import { SalesHistoryService } from './salesHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesHistory, User, Board])],
  providers: [
    SalesHistoryService, //
    SalesHistoryResolver,
  ]
})
export class SalesHistoryModule {}
