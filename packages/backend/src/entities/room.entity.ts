import { User } from './user.entity';

export class Room {
  public users: User[] = [];

  constructor(
    public id: string,
    public name: string,
    public maxUsers: number,
    private password?: string,
  ) {}
}
