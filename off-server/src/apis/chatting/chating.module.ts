import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { User } from '../users/entities/user.entity';
import { Chat } from './entities/chat.entity';
import { ChatGateway } from './gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Board, User])
  ],
  providers: [
    ChatGateway, //
  ]
})
export class ChattingModule {}
