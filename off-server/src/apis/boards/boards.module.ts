import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { BoardsResolver } from './boards.resolver';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User, Category])],
  providers: [BoardsResolver],
})
export class BoardsModule {}
