import {
  Param,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { EventService } from '@event/infra/ports/event.service';
import { CreateEventDto } from '@event/infra/controllers/dto/create-event.dto';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { AccessTokenPayload } from '@auth/infra/types/access-token.payload';
import { QueryPaginationDto } from '@common/dtos/query-pagination.dto';
import { JwtGuard } from '@auth/infra/guards/jwt.guard';

@Controller('event')
export class EventController {
  constructor(
    @Inject(EventService) private readonly eventService: EventService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  createEvent(
    @Body() createEventDto: CreateEventDto,
    @AuthUser() user: AccessTokenPayload,
    @Query('isPublish') isPublish: boolean,
  ) {
    console.log(user);

    return this.eventService.create({
      ...createEventDto,
      creatorId: user.sub,
      isPublish,
    });
  }

  // добавить пагинацию
  @Get()
  listEvents(@Query() query?: QueryPaginationDto) {
    return this.eventService.findAll(query);
  }

  @Get(':id')
  getEvent(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch('change-time/:id')
  changeTime(@Param() id: string, @Body() updateDto: { newDate: Date }) {
    return this.eventService.update(id, {
      date: updateDto.newDate,
    });
  }

  @Delete(':id')
  async removeEvent(@Param('id') id: string) {
    await this.eventService.delete(id);

    return { message: 'Event deleted' };
  }
}
