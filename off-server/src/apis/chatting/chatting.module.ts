import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { User } from '../users/entities/user.entity';
import { ChattingService } from './chatting.service';
import { Chat } from './entities/chat.entity';
import { ChatGateway } from './chatting.gateway';
import { BoardsService } from '../boards/boards.service';
import { SalesLocations } from '../salesLocations/entities/salesLocation.entity';
import { BoardsImage } from '../boardsImages/entities/boardsImage.entity';
import { ChatRoom } from '../chatRoom/entities/chatRoom.entity';
import { ChatRoomService } from '../chatRoom/chatRoom.service';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import { UsersService } from '../users/users.service';
import { UsersImage } from '../usersImages/entities/usersImage.entity';
import { OrderHistoryService } from '../orderHistory/orderHistory.service';
import { SalesHistoryService } from '../salesHistory/salesHistory.service';
import { OrderHistory } from '../orderHistory/entities/orderHistory.entity';
import { SalesHistory } from '../salesHistory/entities/salesHistory.entity';
import { ChattingResolver } from './chatting.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Chat,
      Board,
      User,
      SalesLocations,
      BoardsImage,
      ChatRoom,
      UsersImage,
      OrderHistory,
      SalesHistory,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    ChatGateway, //
    ChattingService,
    BoardsService,
    ChatRoomService,
    UsersService,
    OrderHistoryService,
    SalesHistoryService,
    ChattingResolver,
  ]
})
export class ChattingModule {}
