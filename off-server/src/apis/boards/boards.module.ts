import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { BoardsImage } from '../boardsImages/entities/boardsImage.entity';
import { Category } from '../category/entities/category.entity';
import { SalesLocations } from '../salesLocations/entities/salesLocation.entity';
import { User } from '../users/entities/user.entity';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { Board } from './entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board,
      User,
      Category,
      SalesLocations,
      BoardsImage,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [BoardsResolver, BoardsService],
})
export class BoardsModule {}
