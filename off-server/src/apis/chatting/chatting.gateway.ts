import { Context } from '@nestjs/graphql';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IContext } from 'src/commons/type/context';
import { BoardsService } from '../boards/boards.service';
import { ChatRoomService } from '../chatRoom/chatRoom.service';
import { ChattingService } from './chatting.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*'
  },
})

export class ChatGateway {
  constructor(
    private readonly chattingService: ChattingService, //
    private readonly boardsService: BoardsService,
    private readonly chatRoomService: ChatRoomService,
  ) {}

  @WebSocketServer()
  server: Server;

  wsClients = [];
  
  @SubscribeMessage('message')
  async connectSomeone(
    @MessageBody() data: string, //
    @ConnectedSocket() client, 
    @Context() context: IContext,
    ): Promise<void> {
    const [nickname] = data;
    let [room] = data;

    const boardId = room.split(":")[0]
    const userId = context.req.user.id

    console.log(nickname, room)
    // const board = await this.boardsService.findOne({id: boardId})
    // const writter = board.user.nickname
    const chatHistory = await this.chatRoomService.findRoom({room})
    if (!chatHistory) {
      this.chatRoomService.createRoom({ boardId, userId, room })
    }

    const result = await this.chatRoomService.findRoom({ room })  
    if (result) room = result.room

    if (nickname !== null) {
      const comeOn = `${nickname}님이 입장했습니다.`;
      
      this.server.emit('comeOn' + room, comeOn);
      
      this.wsClients.push(client);
    }
  }

  private broadcast(event, client, message) {
    for (const c of this.wsClients) {
      if (client.id == c.id)
        continue;

      console.log("nanana", event, message)
      c.emit(event, message);
    }
  }

  @SubscribeMessage('send')
  sendMessage(
    @MessageBody() data: string, //
    @ConnectedSocket() client
    ) {
    const [room, nickname, message] = data;
    // console.log(`클라이언트: ${client.id} : ${data}`);
    this.broadcast(room, client, [nickname, message]);
  }


}