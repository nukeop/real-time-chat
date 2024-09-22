export enum BackendEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  ERROR = 'error',
  USER_JOINED = 'userJoined',
}

export enum BackendClientEvent {
  SEND_MESSAGE = 'sendMessage',
  JOIN_ROOM = 'joinRoom',
}
