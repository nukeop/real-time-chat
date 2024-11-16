import { Inject, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ClientEvent, ServerEvent } from '@real-time-chat/core';
import { RoomInfoServerPayload } from '@real-time-chat/core/src/Event';
import { Server, Socket } from 'socket.io';

import { RoomsService } from '../rooms/rooms.service';
import { UsersService } from '../users/users.service';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    @Inject(ChatService) private readonly chatService: ChatService,
    @Inject(RoomsService) private readonly roomsService: RoomsService,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  handleConnection(client: Socket) {
    this.logger.log(
      `${ChatGateway.name}.${this.handleConnection.name} - called`,
      {
        id: client.id,
      },
    );

    this.server.on(ClientEvent.JOIN_ROOM, () => {
      this.logger.log('test');
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(
      `${ChatGateway.name}.${this.handleDisconnect.name} - called`,
      {
        id: client.id,
      },
    );
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
    this.logger.log(
      `${ChatGateway.name}.${this.handleCreateRoom.name} - called`,
      payload,
    );

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

  @SubscribeMessage(ClientEvent.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, payload: { roomId: string }) {
    this.logger.log(
      `${ChatGateway.name}.${this.handleLeaveRoom.name} - called`,
      payload,
    );
    const user = this.usersService.getUserByClientId(client.id);
    const room = this.roomsService.getRoomById(payload.roomId);

    this.roomsService.removeUserFromRoom(room.id, user);
    client.leave(room.id);
    this.server
      .to(room.id)
      .emit(ServerEvent.USER_LEFT, { nickname: user.nickname });
  }

  @SubscribeMessage(ClientEvent.JOIN_ROOM)
  handleJoinRoom(
    client: Socket,
    payload: { roomId: string; nickname: string; password?: string },
  ) {
    this.logger.log(
      `${ChatGateway.name}.${this.handleJoinRoom.name} - called`,
      payload,
    );
    const room = this.roomsService.getRoomById(payload.roomId);

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

    client.emit(ServerEvent.ROOM_INFO, {
      name: room.name,
      users: room.users.map((u) => u.nickname),
    } as RoomInfoServerPayload);

    this.server
      .to(room.id)
      .emit(ServerEvent.USER_JOINED, { nickname: payload.nickname });
  }

  @SubscribeMessage(ClientEvent.SEND_MESSAGE)
  handleMessage(client: Socket, payload: { roomId: string; message: string }) {
    this.logger.log(
      `${ChatGateway.name}.${this.handleMessage.name} - called`,
      payload,
    );
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
