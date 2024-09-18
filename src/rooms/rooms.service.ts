import { Injectable } from '@nestjs/common';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];

  createRoom(roomId: string, maxUsers: number, password?: string): Room {
    const newRoom = new Room(roomId, maxUsers, password);
    this.rooms.push(newRoom);
    return newRoom;
  }

  getRoomById(roomId: string): Room {
    return this.rooms.find(room => room.id === roomId);
  }

  addUserToRoom(roomId: string, user: User) {
    const room = this.getRoomById(roomId);
    if (room && room.users.length < room.maxUsers) {
      room.users.push(user);
    }
  }
}
