export class GetRoomsDto {
  id: string;
  name: string;
  maxUsers: number;
  users: {
    nickname: string;
  }[];
  hasPassword: boolean;
}
