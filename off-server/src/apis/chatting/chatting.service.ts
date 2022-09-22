import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { ChatRoom } from "../chatRoom/entities/chatRoom.entity";
import { ChatOutput } from "./dto/chat.output";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChattingService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>
  ){}

  
  async findMyChatList({ userId }){
    const result = await this.chatRoomRepository.find({
      where: {user: {id: userId}},
      relations: ['user', 'board']
    })

    const out = [];
    await Promise.all(
      result.map(async (el) => {
        const output = new ChatOutput();

        output.board = el.board
        output.id = el.id
        output.roomNumber = el.roomNumber

        const another = await this.chatRoomRepository.find({
          where: {roomNumber: el.roomNumber},
          relations: ['user']
        })

        another.map((u) => {
          if (u.user.id !== el.user.id) {
            output.sendUserId = u.user.id
          }
        })

        const chat = await this.chatRepository.findOne({
          where: {chatRoomId: el.roomNumber},
          order: {createAt: 'DESC'},
        })
        
        output.roomNumber = chat.chatRoomId
        output.lastMessage = chat.message

        out.push(output)
      })
    )
    return out;
  }

  async findBoardChat( {chatRoomId} ) {
    const result = await this.chatRepository.find({
      where: {chatRoomId: chatRoomId},
      relations: ['user']
    })
    return result;
  }

  async createChat( {boardId, message, userId, room} ) {
    const result = await this.chatRepository.save({
      board: boardId,
      message,
      user: userId,
      chatRoomId: room
    })

    return result;
  }

}