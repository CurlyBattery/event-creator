import { EventM } from '@event/domain/model/event';
import { QueryPaginationDto } from '@common/dtos/query-pagination.dto';

export abstract class EventRepository {
  abstract insert(event: EventM): Promise<EventM>;
  abstract getEvents(query?: QueryPaginationDto): Promise<EventM[]>;
  abstract getEventCount(): Promise<number>;
  abstract getEventById(id: string): Promise<EventM>;
  abstract getEventByTitle(title: string): Promise<EventM>;
  abstract updateEvent(id: string, event: Partial<EventM>): Promise<EventM>;
  abstract removeEvent(id: string): Promise<void>;
}
