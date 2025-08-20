import { EventM } from '@event/domain/model/event';

export abstract class EventService {
  abstract create(event: EventM): Promise<EventM>;
  abstract findAll(): Promise<EventM[]>;
  abstract findOne(id: string): Promise<EventM>;
  abstract update(id: string, event: Partial<EventM>): Promise<EventM>;
  abstract delete(id: string): Promise<EventM>;
  abstract publish(id: string): Promise<EventM>; // перевести в статус опубликовано
  abstract reschedule(id: string, newDate: Date): Promise<EventM>;
}
