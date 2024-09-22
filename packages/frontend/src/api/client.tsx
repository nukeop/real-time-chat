import { io } from 'socket.io-client';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://realtime-chat.fly.dev/chat'
    : 'http://localhost:3000';

const socket = io(baseUrl);
export const ApiClient = {
  getRooms: async () => {
    const response = await fetch(`${baseUrl}/rooms`);
    return response.json();
  },
  getSocket: () => socket,
};
