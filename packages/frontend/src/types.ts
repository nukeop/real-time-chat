export type User = {
  nickname: string;
  clientId: string;
};

export type Room = {
  id: string;
  name: string;
  maxUsers: number;
  users: User[];
};
