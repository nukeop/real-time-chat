import { Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

const DEFAULT_MAX_USERS = 10;
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
      return this.createRoom(id, DEFAULT_MAX_USERS);
    } else {
      return room;
    }
  }

  getRooms(): Room[] {
    return this.rooms;
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
}
