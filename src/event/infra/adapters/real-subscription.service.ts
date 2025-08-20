import { Injectable } from '@nestjs/common';
import { SubscriptionService } from '@event/infra/ports/subscription.service';

@Injectable()
export class RealSubscriptionService implements SubscriptionService {
  // constructor(
  //   @Inject(SubscriptionRepository)
  //   private readonly subscriptionRepository: SubscriptionRepository,
  // ) {}
  //
  // async addParticipant(
  //   eventId: string,
  //   userId: string,
  // ): Promise<SubscriptionM> {
  //   throw new Error('Method not implemented.');
  // }
  // async removeParticipant(eventId: string, userId: string): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }
  // async listParticipants(eventId: string): Promise<SubscriptionM[]> {
  //   throw new Error('Method not implemented.');
  // }
}
