import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  providers: [RoomsService],
  exports: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
