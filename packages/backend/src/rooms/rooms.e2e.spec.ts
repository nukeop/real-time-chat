import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { RoomsModule } from './rooms.module';
import { RoomsService } from './rooms.service';

describe('Rooms - E2E tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createApp();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should return a list of rooms', async () => {
    const roomService = app.get(RoomsService);
    roomService.createRoom('room1', 10);
    const result = await getRooms().expect(200);

    expect(result.body).toEqual([
      {
        id: expect.any(String),
        name: 'room1',
        maxUsers: 10,
        users: [],
      },
    ]);
  });

  it('should not show the room password', async () => {
    const roomService = app.get(RoomsService);
    roomService.createRoom('room1', 10, 'my-password');
    const result = await getRooms().expect(200);

    expect(result.body.password).toBeUndefined();
  });

  it('should show that there are users in the room', async () => {
    const roomService = app.get(RoomsService);
    roomService.addUserToRoom('room1', {
      nickname: 'test-user',
      clientId: 'user1',
    });
    const rooms = await getRooms();
    expect(rooms.status).toBe(200);
    expect(rooms.body).toEqual([
      {
        id: expect.any(String),
        name: 'room1',
        maxUsers: 10,
        users: [{ nickname: 'test-user', clientId: 'user1' }],
      },
    ]);
  });

  const getRooms = () => request(app.getHttpServer()).get('/rooms');
});

const createApp = async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [RoomsModule],
    providers: [
      {
        provide: RoomsService,
        useValue: {
          getRooms: jest.fn().mockReturnValue([]),
        },
      },
    ],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
};
