import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatRoom } from "./entities/chatRoom.entity";

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>
  ){}
  
  async findRoom({room}){
    console.log("findRoom", room)
    return await this.chatRoomRepository.findOne({where: {roomNumber: room}})
  }

  async createRoom({ boardId, userId, room }){
    await this.chatRoomRepository.save({ 
      board: boardId, //
      user: userId,
      roomNumber: room
    })
  }


}