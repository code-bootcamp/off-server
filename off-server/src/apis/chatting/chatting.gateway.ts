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
import { UsersService } from '../users/users.service';
import { ChattingService } from './chatting.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
    credentials: true,
  }, 
})

export class ChatGateway {
  constructor(
    private readonly chattingService: ChattingService, //
    private readonly boardsService: BoardsService,
    private readonly chatRoomService: ChatRoomService,
    private readonly usersService: UsersService
  ) {}

  @WebSocketServer()
  server: Server;

  wsClients = [];
  
  @SubscribeMessage('message')
  async connectSomeone(
    @MessageBody() data: string, //
    @ConnectedSocket() client, 
    ) {
    const [nickname, room, boardId] = data;

    if (nickname !== null) {

      const user = await this.usersService.findUserId(nickname)
      
      const chatHistory = await this.chatRoomService.findRoom({room})
      if (!chatHistory) {
        await this.chatRoomService.createRoom({ boardId, userId: user.id, room })
      }

      const comeOn = `${user.nickname}님이 입장했습니다.`;
      
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
  async sendMessage(
    @MessageBody() data: string, //
    @ConnectedSocket() client,
    // @Context() context: IContext,
    ): Promise<void> {
    // const userId = context.req.user.id
    const [room, nickname, message] = data;
    // console.log(`클라이언트: ${client.id} : ${data}`);
    const realNickname = (await this.usersService.findUserId(nickname)).nickname
    const userId = nickname

    this.broadcast(room, client, [realNickname, message]);
    const boardId = room.split(":")[0]

    await this.chattingService.createChat({boardId, message, userId, room})
  }


}