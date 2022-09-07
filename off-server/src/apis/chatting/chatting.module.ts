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

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Board, User, SalesLocations, BoardsImage]),
  ],
  providers: [
    ChatGateway, //
    ChattingService,
    BoardsService,
  ],
})
export class ChattingModule {}
