import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ChatModule, RoomsModule, UsersModule],
})
export class AppModule {}
