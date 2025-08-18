import { Injectable } from '@nestjs/common';
import { EventRepository } from '@event/infra/ports/event.repository';

@Injectable()
export class RealEventRepository implements EventRepository {
  // constructor(private readonly prisma: PrismaService) {}
  //
  // insert(event: EventM): Promise<EventM> {
  //   throw new Error('not implemented');
  // }
  // getEvents(): Promise<EventM[]> {
  //   throw new Error('not implemented');
  // }
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
