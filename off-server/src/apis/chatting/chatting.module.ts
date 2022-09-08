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
    UsersService
  ]
})
export class ChattingModule {}
