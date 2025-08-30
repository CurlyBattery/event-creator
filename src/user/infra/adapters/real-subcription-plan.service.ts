import { Injectable } from '@nestjs/common';
import { SubscriptionPlanService } from '@user/infra/ports/subscription-plan.service';
import { UserM } from '@user/domain/model/user';

@Injectable()
export class RealSubscriptionPlanService implements SubscriptionPlanService {
  upgrade(): boolean | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  me(): Pick<UserM, 'subscriptionPlan'> {
    throw new Error('Method not implemented.');
  }
  cancel(): boolean | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
