export enum ServerEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  ERROR = 'error',
  USER_JOINED = 'userJoined',
  ROOM_CREATED = 'roomCreated',
}

export enum ClientEvent {
  SEND_MESSAGE = 'sendMessage',
  CREATE_ROOM = 'createRoom',
  JOIN_ROOM = 'joinRoom',
}
