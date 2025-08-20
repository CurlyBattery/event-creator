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
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiQuery,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { EventService } from '@event/infra/ports/event.service';
import { AccessTokenPayload } from '@auth/infra/types/access-token.payload';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { JwtGuard } from '@auth/infra/guards/jwt.guard';
import { CreateEventDto } from '@event/infra/controllers/dto/create-event.dto';
import { UpdateEventDto } from '@event/infra/controllers/dto/update-event.dto';
import { RescheduleDto } from '@event/infra/controllers/dto/reschedule.dto';
import { EventM } from '@event/domain/model/event';
import { SuccessDto } from '@common/dtos/success.dto';

@UseGuards(JwtGuard)
@Controller('event')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Нужно войти в систему' })
export class EventController {
  constructor(
    @Inject(EventService) private readonly eventService: EventService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание мероприятия/собрания' })
  @ApiBody({
    type: CreateEventDto,
  })
  @ApiQuery({
    type: Boolean,
    name: 'isPublished',
    required: true,
    description: 'Опубликовать мероприятие сразу или нет',
  })
  @ApiCreatedResponse({ type: EventM })
  @ApiConflictResponse({
    description: 'Мероприятие с таким названием уже существует',
  })
  @ApiBadRequestResponse({
    description:
      'Не выполнены правила для даты проведения и/или количества мест',
  })
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
  @ApiOperation({ summary: 'Получить опубликованные события' })
  @ApiOkResponse({
    type: EventM,
    isArray: true,
  })
  allPublishEvents() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить одну мероприятие по уникальному идентификатору',
  })
  @ApiParam({
    type: String,
    name: 'id',
    required: true,
    description: 'UUID мероприятия',
  })
  @ApiOkResponse({ type: EventM })
  @ApiNotFoundResponse({
    description: 'Мероприятие по данному идентификатору не найдено в бд',
  })
  oneEvent(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновление данных мероприятия по uuid' })
  @ApiParam({
    type: String,
    name: 'id',
    required: true,
    description: 'UUID мероприятия',
  })
  @ApiBody({ type: UpdateEventDto })
  @ApiCreatedResponse({ type: EventM })
  @ApiNotFoundResponse({
    description: 'Мероприятие по uuid не было найдено в бд',
  })
  @ApiConflictResponse({
    description: 'Мероприятие с таким заголовком уже существует',
  })
  @ApiBadRequestResponse({
    description: 'Количество мест должно быть больше 0',
  })
  replaceEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление одного мероприятия по уникальному идентификатору ',
  })
  @ApiParam({
    type: String,
    name: 'id',
    required: true,
    description: 'UUID мероприятия',
  })
  @ApiOkResponse({ type: SuccessDto })
  @ApiNotFoundResponse({
    description: 'Мероприятие по uuid не найдено в бд',
  })
  removeEvent(@Param('id') id: string) {
    return this.eventService.delete(id);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Опубликовать мероприятие' })
  @ApiParam({
    type: String,
    name: 'id',
    required: true,
    description: 'UUID мероприятия',
  })
  @ApiCreatedResponse({ type: EventM })
  @ApiNotFoundResponse({ description: 'Мероприятие по uuid не найдено в бд' })
  publishEvent(@Param('id') id: string) {
    return this.eventService.publish(id);
  }

  // добавить причину изменения даты с отправлением сообщения на почту
  @Patch(':id/reschedule')
  @ApiOperation({ summary: 'Изменить время проведения мероприятия' })
  @ApiParam({
    type: String,
    name: 'id',
    required: true,
    description: 'UUID ',
  })
  @ApiBody({ type: RescheduleDto })
  @ApiCreatedResponse({ type: EventM })
  @ApiNotFoundResponse({
    description: 'Мероприятие по данному uuid не найдено в бд',
  })
  @ApiBadRequestResponse({
    description: 'Дата проведения должна быть позже чем текущая дата',
  })
  rescheduleEvent(@Param('id') id: string, @Body() dto: RescheduleDto) {
    return this.eventService.reschedule(id, dto.newDate);
  }
}
