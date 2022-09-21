import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { ChatRoom } from "./entities/chatRoom.entity";

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>
  ){}
  
  async findRoom({room}){
    console.log("findRoom", room)
    return await this.chatRoomRepository.findOne({where: {roomNumber: room}})
  }

  async createRoom({ boardId, userId, room }){
    const boardUser = await this.boardRepository.findOne({
      where: {id: boardId},
      relations: ['user']
    })

    console.log("sisisi", boardUser.user.id, typeof boardUser.user.id)
    const user2: string = boardUser.user.id

    await this.chatRoomRepository.save({ 
      board: boardId, //
      user: userId,
      roomNumber: room
    })

    await this.chatRoomRepository.save({ 
      board: boardId, //
      user: boardUser.user,
      roomNumber: room
    })


  }


}