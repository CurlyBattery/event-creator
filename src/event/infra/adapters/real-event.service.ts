import { Injectable } from '@nestjs/common';
import { EventService } from '@event/infra/ports/event.service';

@Injectable()
export class RealEventService implements EventService {
  // create(event: EventM): Promise<EventM> {
  //   throw new Error('Method not implemented.');
  // }
  // findAll(): Promise<EventM[]> {
  //   throw new Error('Method not implemented.');
  // }
  // findOne(id: string): Promise<EventM> {
  //   throw new Error('Method not implemented.');
  // }
  // update(id: string, event: EventM): Promise<EventM> {
  //   throw new Error('Method not implemented.');
  // }
  // delete(id: string): Promise<EventM> {
  //   throw new Error('Method not implemented.');
  // }
  // publish(id: string): Promise<EventM> {
  //   throw new Error('Method not implemented.');
  // }
  // reschedulie(id: string, newDate: Date): Promise<EventM> {
  //   throw new Error('Method not implemented.');
  // }
  // addParticipant(eventId: string, userId: string): Promise<SubscriptionM> {
  //   throw new Error('Method not implemented.');
  // }
  // removeParticipant(eventId: string, userId: string): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }
  // listParticipants(eventId: string): Promise<SubscriptionM[]> {
  //   throw new Error('Method not implemented.');
  // }
}
