export const apiBaseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://realtime-chat.fly.dev';

export const socketBaseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'localhost:3000/chat'
    : 'https://realtime-chat.fly.dev/chat';

export type GetRoomsResponse = {
  id: string;
  name: string;
  maxUsers: number;
  users: {
    nickname: string;
  }[];
  hasPassword: boolean;
};

export const ApiClient = {
  getRooms: async (): Promise<GetRoomsResponse[]> => {
    const response = await fetch(`${apiBaseUrl}/rooms`);
    return response.json();
  },
};
