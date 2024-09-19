import { Injectable } from '@nestjs/common';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

const DEFAULT_MAX_USERS = 10;
@Injectable()
export class RoomsService {
  private rooms: Room[] = [];

  createRoom(roomId: string, maxUsers: number, password?: string): Room {
    const newRoom = new Room(roomId, maxUsers, password);
    this.rooms.push(newRoom);
    return newRoom;
  }

  getRoomById(roomId: string): Room {
    const room = this.rooms.find((room) => room.id === roomId);

    if (!room) {
      return this.createRoom(roomId, DEFAULT_MAX_USERS);
    } else {
      return room;
    }
  }

  addUserToRoom(roomId: string, user: User) {
    const room = this.getRoomById(roomId);
    if (room && room.users.length < room.maxUsers) {
      room.users.push(user);
    }
  }
}
