import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BoardsService } from '../boards/boards.service';
import { ChattingService } from './chatting.service';

let count = 0;

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
  ) {}

  @WebSocketServer()
  server: Server;

  wsClients = [];

  @SubscribeMessage('message')
  async connectSomeone(@MessageBody() data: string, @ConnectedSocket() client): Promise<void> {
    const [nickname, room] = data;
    // 인원수 제한
    if (room) count++

    console.log("count:", count)

    const boardId = room.split(":")[0]

    const board = await this.boardsService.findOne({id: boardId})
    const writterNickname = board.user.nickname

    // boardId-1 + count boardId1 boardId2 ....
    // if (count > 1) {
    //   room = room + count 
    // }

    // 두명 담아주기
    if (nickname !== null) {
      const chatter = [writterNickname, nickname]
      console.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`);
      const comeOn = `${nickname}님이 입장했습니다.`;
      

      chatter.map((el: string) => {
        this.server.emit('comeOn' + room, el);
      })
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