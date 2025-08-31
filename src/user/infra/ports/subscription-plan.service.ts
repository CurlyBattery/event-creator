import { UserM } from '@user/domain/model/user';

export abstract class SubscriptionPlanService {
  abstract upgrade(id: string): Promise<boolean>;
  abstract me(id: string): Promise<Pick<UserM, 'subscriptionPlan'>>;
  abstract cancel(id: string): Promise<boolean>;
}
