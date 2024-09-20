import { Controller, Get, HttpCode, Inject } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject(RoomsService) private readonly roomsService: RoomsService,
  ) {}

  @HttpCode(200)
  @Get('/')
  getRooms() {
    return this.roomsService.getRooms();
  }
}
