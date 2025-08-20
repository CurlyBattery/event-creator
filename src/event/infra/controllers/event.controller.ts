import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
  Param,
  Put,
  Delete,
  ParseBoolPipe,
  Patch,
} from '@nestjs/common';

import { EventService } from '@event/infra/ports/event.service';
import { SubscriptionService } from '@event/infra/ports/subscription.service';
import { AccessTokenPayload } from '@auth/infra/types/access-token.payload';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { JwtGuard } from '@auth/infra/guards/jwt.guard';
import { CreateEventDto } from '@event/infra/controllers/dto/create-event.dto';
import { UpdateEventDto } from '@event/infra/controllers/dto/update-event.dto';
import { RescheduleDto } from '@event/infra/controllers/dto/reschedule.dto';

@UseGuards(JwtGuard)
@Controller('event')
export class EventController {
  constructor(
    @Inject(EventService) private readonly eventService: EventService,
    @Inject(SubscriptionService)
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Post()
  add(
    @Body() createEventDto: CreateEventDto,
    @Query('isPublished', ParseBoolPipe) isPublished: boolean,
    @AuthUser() user: AccessTokenPayload,
  ) {
    return this.eventService.create({
      ...createEventDto,
      date: new Date(createEventDto.date),
      isPublished,
      creatorId: user.sub,
    });
  }

  @Get()
  allPublishEvents() {
    return this.eventService.findAll();
  }

  @Get(':id')
  oneEvent(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  replaceEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  removeEvent(@Param('id') id: string) {
    return this.eventService.delete(id);
  }

  @Patch(':id/publish')
  publishEvent(@Param('id') id: string) {
    return this.eventService.publish(id);
  }

  @Patch(':id/reschedule')
  rescheduleEvent(@Param('id') id: string, @Body() dto: RescheduleDto) {
    return this.eventService.reschedule(id, dto.newDate);
  }
}
