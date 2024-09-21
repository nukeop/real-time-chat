import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service';
import { UsersService } from '../users/users.service';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger('ChatGateway');

  constructor(
    private readonly chatService: ChatService,
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService,
  ) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    client: Socket,
    payload: { roomId: string; nickname: string; password?: string },
  ) {
    const room = this.roomsService.getRoomById(payload.roomId);

    if (room.hasPassword() && room.validatePassword(payload.password)) {
      client.emit('error', { message: 'Incorrect password' });
      return;
    }

    if (room.users.length >= room.maxUsers) {
      client.emit('error', { message: 'Room is full' });
      return;
    }

    const user = this.usersService.createUser(payload.nickname, client.id);
    this.roomsService.addUserToRoom(payload.roomId, user);

    client.join(payload.roomId);
    this.server
      .to(payload.roomId)
      .emit('userJoined', { nickname: payload.nickname });
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { roomId: string; message: string }) {
    if (!this.chatService.validateMessage(payload.message)) {
      client.emit('error', { message: 'Invalid message' });
      return;
    }

    const user = this.usersService.getUserByClientId(client.id);
    this.server.to(payload.roomId).emit('message', {
      nickname: user.nickname,
      message: payload.message,
    });
  }
}
