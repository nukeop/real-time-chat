import { Controller, Get, HttpCode, Inject, Logger } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  private readonly logger = new Logger(RoomsController.name);
  constructor(
    @Inject(RoomsService) private readonly roomsService: RoomsService,
  ) {}

  @HttpCode(200)
  @Get('/')
  getRooms() {
    this.logger.log(`${RoomsController.name}.${this.getRooms.name} - called`);
    return this.roomsService.getRooms();
  }
}
