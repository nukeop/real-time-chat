import { User } from './user.entity';

export class Room {
  public users: User[] = [];

  constructor(
    public id: string,
    public maxUsers: number,
    public password?: string,
  ) {}
}
