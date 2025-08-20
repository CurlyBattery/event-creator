import { Prisma } from 'generated/prisma';
import { EventM } from '@event/domain/model/event';

export abstract class EventRepository {
  abstract insert(event: EventM): Promise<EventM>;
  abstract getEvents(where?: Prisma.EventWhereInput): Promise<EventM[]>;
  abstract getEventById(id: string): Promise<EventM>;
  abstract getEventByTitle(title: string): Promise<EventM>;
  abstract updateEvent(id: string, event: Partial<EventM>): Promise<EventM>;
  abstract removeEvent(id: string): Promise<void>;
}
