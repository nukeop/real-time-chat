import { Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';
import { GetRoomsDto } from './dto/get-rooms.dto';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  private readonly logger = new Logger('ChatGateway');

  createRoom(name: string, maxUsers: number, password?: string): Room {
    this.logger.log(`Creating room: ${name}`);
    const newRoom = new Room(nanoid(), name, maxUsers, password);
    this.rooms.push(newRoom);
    return newRoom;
  }

  getRoomById(id: string): Room {
    this.logger.log(`Getting room by id: ${id}`);
    const room = this.rooms.find((room) => room.id === id);

    if (!room) {
      throw new Error(`Room with id ${id} not found`);
    } else {
      return room;
    }
  }

  getRooms(): GetRoomsDto[] {
    this.logger.log('Getting all rooms');
    return this.rooms.map((room) => ({
      id: room.id,
      name: room.name,
      maxUsers: room.maxUsers,
      users: room.users.map((user) => ({ nickname: user.nickname })),
      hasPassword: room.hasPassword(),
    }));
  }

  addUserToRoom(roomId: string, user: User) {
    this.logger.log(
      `Adding user <${user.clientId}≥[${user.nickname}] to room: ${roomId}`,
    );
    const room = this.getRoomById(roomId);
    if (room && room.users.length < room.maxUsers) {
      room.users.push(user);
    }
  }

  removeUserFromRoom(roomId: string, user: User) {
    this.logger.log(
      `Removing user <${user.clientId}≥[${user.nickname}] from room: ${roomId}`,
    );
    const room = this.getRoomById(roomId);
    if (room) {
      room.users = room.users.filter((u) => u.clientId !== user.clientId);
    }
  }
}
