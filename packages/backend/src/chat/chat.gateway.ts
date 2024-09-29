import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ClientEvent, ServerEvent } from '@real-time-chat/core';
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

  @SubscribeMessage(ClientEvent.CREATE_ROOM)
  handleCreateRoom(
    client: Socket,
    payload: {
      name: string;
      nickname: string;
      maxUsers: number;
      password?: string;
    },
  ) {
    const room = this.roomsService.createRoom(
      payload.name,
      payload.maxUsers,
      payload.password,
    );
    client.emit(ServerEvent.ROOM_CREATED, { id: room.id });
    client.join(room.id);
    this.server
      .to(room.id)
      .emit(ServerEvent.USER_JOINED, { nickname: payload.nickname });
  }

  @SubscribeMessage(ClientEvent.JOIN_ROOM)
  handleJoinRoom(
    client: Socket,
    payload: { id: string; nickname: string; password?: string },
  ) {
    const room = this.roomsService.getRoomById(payload.id);

    if (room.hasPassword() && room.validatePassword(payload.password)) {
      client.emit(ServerEvent.ERROR, { message: 'Incorrect password' });
      return;
    }

    if (room.users.length >= room.maxUsers) {
      client.emit(ServerEvent.ERROR, { message: 'Room is full' });
      return;
    }

    const user = this.usersService.createUser(payload.nickname, client.id);
    this.roomsService.addUserToRoom(room.id, user);

    client.join(room.id);
    this.server
      .to(room.id)
      .emit(ServerEvent.USER_JOINED, { nickname: payload.nickname });
  }

  @SubscribeMessage(ClientEvent.SEND_MESSAGE)
  handleMessage(client: Socket, payload: { roomId: string; message: string }) {
    if (!this.chatService.validateMessage(payload.message)) {
      client.emit(ServerEvent.ERROR, { message: 'Invalid message' });
      return;
    }

    const user = this.usersService.getUserByClientId(client.id);
    this.server.to(payload.roomId).emit(ServerEvent.MESSAGE, {
      nickname: user.nickname,
      message: payload.message,
    });
  }
}
