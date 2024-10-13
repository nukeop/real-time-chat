import { io } from 'socket.io-client';

export const apiBaseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'https://realtime-chat.fly.dev'
    : 'http://localhost:3000';

export const socketBaseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'https://realtime-chat.fly.dev/chat'
    : 'localhost:3000/chat';

export type GetRoomsResponse = {
  id: string;
  name: string;
  maxUsers: number;
  users: {
    nickname: string;
  }[];
  hasPassword: boolean;
};

const socket = io(apiBaseUrl);
export const ApiClient = {
  getRooms: async (): Promise<GetRoomsResponse[]> => {
    const response = await fetch(`${apiBaseUrl}/rooms`);
    return response.json();
  },
  getSocket: () => socket,
};
