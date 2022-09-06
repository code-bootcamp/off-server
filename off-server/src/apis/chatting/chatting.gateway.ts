import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
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
  ) {}

  @WebSocketServer()
  server: Server;

  wsClients = [];

  @SubscribeMessage('message')
  connectSomeone(@MessageBody() data: string, @ConnectedSocket() client): void {
    const [nickname, room] = data;
    console.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`);
    const comeOn = `${nickname}님이 입장했습니다.`;
    this.server.emit('comeOn' + room, comeOn);
    this.wsClients.push(client);
  }

  private broadcast(event, client, message: any) {
    for (const c of this.wsClients) {
      if (client.id == c.id)
        continue;
      c.emit(event, message);
    }
  }

  @SubscribeMessage('send')
  sendMessage(@MessageBody() data: string, @ConnectedSocket() client) {
    const [room, nickname, message] = data;
    console.log(`클라이언트: ${client.id} : ${data}`);
    this.broadcast(room, client, [nickname, message]);
  }
}