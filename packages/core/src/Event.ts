export enum ServerEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  ERROR = 'error',
  USER_JOINED = 'userJoined',
  USER_LEFT = 'userLeft',
  ROOM_CREATED = 'roomCreated',
  ROOM_INFO = 'roomInfo',
}

export enum ClientEvent {
  SEND_MESSAGE = 'sendMessage',
  CREATE_ROOM = 'createRoom',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
}

export type RoomInfoServerPayload = {
  name: string;
  users: string[];
};
