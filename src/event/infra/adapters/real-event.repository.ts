import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

import { EventRepository } from '@event/infra/ports/event.repository';
import { EventM } from '@event/domain/model/event';
import { PrismaService } from '@common/database/infra/persistence/prisma.service';

@Injectable()
export class RealEventRepository implements EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  insert(event: EventM): Promise<EventM> {
    return this.prisma.event.create({
      data: event,
    });
  }

  getEvents(where?: Prisma.EventWhereInput): Promise<EventM[]> {
    return this.prisma.event.findMany({
      where,
    });
  }

  getEventById(id: string): Promise<EventM> {
    return this.prisma.event.findUnique({ where: { id } });
  }

  getEventByTitle(title: string): Promise<EventM> {
    return this.prisma.event.findUnique({ where: { title } });
  }

  updateEvent(id: string, event: Partial<EventM>): Promise<EventM> {
    return this.prisma.event.update({
      where: { id },
      data: event,
    });
  }

  async removeEvent(id: string): Promise<void> {
    await this.prisma.event.delete({
      where: { id },
    });
  }
}
