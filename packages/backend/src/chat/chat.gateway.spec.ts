import { Test, TestingModule } from '@nestjs/testing';
import { Socket } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service';
import { UsersService } from '../users/users.service';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let chatService: ChatService;
  let roomsService: RoomsService;
  let client: Socket;

  const mockServer = {
    to: jest.fn().mockReturnThis(),
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        {
          provide: ChatService,
          useValue: { validateMessage: jest.fn().mockReturnValue(true) },
        },
        {
          provide: RoomsService,
          useValue: {
            getRoomById: jest.fn().mockReturnValue({ users: [], maxUsers: 10 }),
            addUserToRoom: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn().mockReturnValue({ nickname: 'TestUser' }),
            getUserByClientId: jest
              .fn()
              .mockReturnValue({ nickname: 'TestUser' }),
          },
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    chatService = module.get<ChatService>(ChatService);
    roomsService = module.get<RoomsService>(RoomsService);
    client = { id: 'socket1', join: jest.fn(), emit: jest.fn() } as any;
    gateway.server = mockServer as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should allow a user to join a room', () => {
    const roomId = 'room1';
    gateway.handleJoinRoom(client, { roomId, nickname: 'TestUser' });

    expect(roomsService.addUserToRoom).toHaveBeenCalledWith(roomId, {
      nickname: 'TestUser',
    });
    expect(client.join).toHaveBeenCalledWith(roomId);
    expect(mockServer.to).toHaveBeenCalledWith(roomId);
    expect(mockServer.emit).toHaveBeenCalledWith('userJoined', {
      nickname: 'TestUser',
    });
  });

  it('should send a message to the room', () => {
    const roomId = 'room1';
    const message = 'Hello World';
    gateway.handleMessage(client, { roomId, message });

    expect(mockServer.to).toHaveBeenCalledWith(roomId);
    expect(mockServer.emit).toHaveBeenCalledWith('message', {
      nickname: 'TestUser',
      message,
    });
  });

  it('should validate the message before broadcasting', () => {
    jest.spyOn(chatService, 'validateMessage').mockReturnValue(false);
    const roomId = 'room1';
    gateway.handleMessage(client, { roomId, message: '' });

    expect(chatService.validateMessage).toHaveBeenCalledWith('');
    expect(mockServer.emit).not.toHaveBeenCalled();
  });
});
