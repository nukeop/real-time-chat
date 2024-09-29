import { io } from 'socket.io-client';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://realtime-chat.fly.dev/chat'
    : 'http://localhost:3000';

export type GetRoomsResponse = {
  id: string;
  name: string;
  maxUsers: number;
  users: {
    nickname: string;
  }[];
  hasPassword: boolean;
};

const socket = io(baseUrl);
export const ApiClient = {
  getRooms: async (): Promise<GetRoomsResponse[]> => {
    const response = await fetch(`${baseUrl}/rooms`);
    return response.json();
  },
  getSocket: () => socket,
};
