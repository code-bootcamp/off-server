import { Module } from "@nestjs/common";
import { Board } from "../boards/entities/board.entity";
import { User } from "../users/entities/user.entity";
import { ChatRoomService } from "./chatRoom.service";
import { ChatRoom } from "./entities/chatRoom.entity";

@Module({
  imports: [
    ChatRoom, //
    Board,
    User,
  ],
  providers: [
    ChatRoomService, //
  ]
})
export class ChatRoomModule{}