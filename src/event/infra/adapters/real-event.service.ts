import { Inject, Injectable } from '@nestjs/common';

import { EventService } from '@event/infra/ports/event.service';
import { EventM } from '@event/domain/model/event';
import { EventRepository } from '@event/infra/ports/event.repository';
import { AbstractException } from '@common/exceptions/domain/exception';
import { QueryPaginationDto } from '@common/dtos/query-pagination.dto';
import { paginateOutput, PaginateOutput } from '@common/utils/pagination.util';

@Injectable()
export class RealEventService implements EventService {
  constructor(
    @Inject(EventRepository) private readonly eventRepository: EventRepository,
    @Inject(AbstractException)
    private readonly exceptionService: AbstractException,
  ) {}

  async create(event: EventM): Promise<EventM> {
    const exists = await this.eventRepository.getEventByTitle(event.title);
    if (exists) {
      this.exceptionService.conflictException({
        message: 'Event Already Exists',
        codeError: 409,
      });
    }

    const created = await this.eventRepository.insert({
      ...event,
      date: new Date(event.date),
    });

    return created;
  }
  async findAll(query?: QueryPaginationDto): Promise<PaginateOutput<EventM>> {
    const [events, total] = await Promise.all([
      await this.eventRepository.getEvents(query),
      await this.eventRepository.getEventCount(),
    ]);

    return paginateOutput(events, total, query);
  }
  // findOne(id: string): Promise<EventM> {
  //   throw new Error('Method not implemented.');
  // }
  // update(id: string, event: EventM): Promise<EventM> {
  //   throw new Error('Method not implemented.');
  // }
  // delete(id: string): Promise<EventM> {
  //   throw new Error('Method not implemented.');
  // }
}
