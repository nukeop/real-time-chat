import { User } from './user.entity';

export class Room {
  public users: User[] = [];

  constructor(
    public id: string,
    public name: string,
    public maxUsers: number,
    private password?: string,
  ) {}

  hasPassword(): boolean {
    return Boolean(this.password);
  }

  validatePassword(password: string): boolean {
    return this.password === password;
  }
}
