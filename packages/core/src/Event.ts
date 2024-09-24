export enum ServerEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  ERROR = 'error',
  USER_JOINED = 'userJoined',
}

export enum ClientEvent {
  SEND_MESSAGE = 'sendMessage',
  JOIN_ROOM = 'joinRoom',
}
