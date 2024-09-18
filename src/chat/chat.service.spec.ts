import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should return true for a valid message', () => {
    expect(service.validateMessage('Hello')).toBe(true);
  });

  it('should return false for an empty message', () => {
    expect(service.validateMessage('')).toBe(false);
  });

  it('should return false for a message with only spaces', () => {
    expect(service.validateMessage('   ')).toBe(false);
  });
});
