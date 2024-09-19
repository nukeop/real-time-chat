import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  createUser(nickname: string, clientId: string): User {
    const newUser = new User(nickname, clientId);
    this.users.push(newUser);
    return newUser;
  }

  getUserByClientId(clientId: string): User {
    return this.users.find((user) => user.clientId === clientId);
  }
}
