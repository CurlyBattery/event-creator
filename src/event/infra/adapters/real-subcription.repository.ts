import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '@event/infra/ports/subscription.repository';

@Injectable()
export class RealSubscriptionRepository implements SubscriptionRepository {
  // subscribe(subscription: SubscriptionM): Promise<SubscriptionM> {
  //   throw new Error('Method not implemented.');
  // }
  // unSubscribe(id: string): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }
}
