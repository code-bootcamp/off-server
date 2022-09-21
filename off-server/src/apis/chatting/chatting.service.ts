import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChattingService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>
  ){}

  
  async findMyChatList({ userId }){
    const result = await this.chatRepository.find({
      where: { user: {id: userId},},
      order: {createAt: 'DESC'},
    })
  
    await Promise.all(
      result.map(async (el) => {
      const chat = await this.chatRepository.findOne({
        where: {chatRoomId: el.chatRoomId},
        order: {createAt: 'DESC'},
      })
     return el.message = chat.message
    })
    )

    return result;
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