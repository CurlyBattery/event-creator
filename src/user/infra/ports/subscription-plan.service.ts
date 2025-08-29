import { UserM } from '@user/domain/model/user';

export abstract class SubscriptionPlanService {
  abstract upgrade(): boolean | Promise<boolean>;
  abstract me(): Pick<UserM, 'subscriptionPlan'>;
  abstract cancel(): boolean | Promise<boolean>;
}
