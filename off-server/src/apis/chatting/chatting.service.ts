import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChattingService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ){}

  
  async findMyChat({ userId }){
    const result = await this.chatRepository.find({where: {user: {id: userId}}})
    return result;
  }

  async findBoardChat( {boardId} ) {
    const result = await this.chatRepository.find({where: {board: {id: boardId}}})
    return result;
  }

  async createChat( {userId, boardId, message} ) {
    const result = await this.chatRepository.save({
      user: userId,
      board: boardId,
      message
    })

    return result;
  }

}