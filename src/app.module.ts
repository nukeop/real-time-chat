import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ChatModule, RoomsModule, UsersModule],
})
export class AppModule {}
