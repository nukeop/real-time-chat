import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  validateMessage(message: string): boolean {
    return Boolean(message && message.trim().length > 0);
  }
}