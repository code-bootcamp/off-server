import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { User } from '../users/entities/user.entity';
import { ChattingResolver } from './chatting.resolver';
import { ChattingService } from './chatting.service';
import { Chat } from './entities/chat.entity';
import { ChatGateway } from './chatting.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Board, User])
  ],
  providers: [
    ChatGateway, //
    ChattingResolver,
    ChattingService
  ]
})
export class ChattingModule {}
