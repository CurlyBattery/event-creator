import { Injectable } from '@nestjs/common';
import { EventRepository } from '@event/infra/ports/event.repository';
import { PrismaService } from '@common/database/infra/persistence/prisma.service';
import { EventM } from '@event/domain/model/event';
import { QueryPaginationDto } from '@common/dtos/query-pagination.dto';
import { paginate } from '@common/utils/pagination.util';

@Injectable()
export class RealEventRepository implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  getEventCount(): Promise<number> {
    return this.prisma.event.count();
  }

  getEventByTitle(title: string): Promise<EventM> {
    return this.prisma.event.findUnique({
      where: { title },
    });
  }

  insert(event: EventM): Promise<EventM> {
    return this.prisma.event.create({
      data: event,
    });
  }
  getEvents(query?: QueryPaginationDto): Promise<EventM[]> {
    return this.prisma.event.findMany({
      ...paginate(query),
    });
  }
  // getEventById(id: string): Promise<EventM> {
  //   throw new Error('not implemented');
  // }
  // updateEvent(id: string, event: Partial<EventM>): Promise<EventM> {
  //   throw new Error('not implemented');
  // }
  // removeEvent(id: string): Promise<void> {
  //   throw new Error('not implemented');
  // }
}
