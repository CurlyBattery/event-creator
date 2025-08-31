import { Injectable } from '@nestjs/common';
import { SubscriptionPlanService } from '@user/infra/ports/subscription-plan.service';
import { UserM } from '@user/domain/model/user';
import { RealUserRepository } from '@user/infra/adapters/repositories/user/real-user.repository';
import { SubscriptionPlan } from '../../../../generated/prisma';

@Injectable()
export class RealSubscriptionPlanService implements SubscriptionPlanService {
  constructor(private readonly realUserRepository: RealUserRepository) {}

  async upgrade(id: string): Promise<boolean> {
    const user = await this.realUserRepository.updateUser(id, {
      subscriptionPlan: SubscriptionPlan.PRO,
    });

    return !!user.subscriptionPlan;
  }
  async me(id: string): Promise<Pick<UserM, 'subscriptionPlan'>> {
    const user = await this.realUserRepository.updateUser(id, {
      subscriptionPlan: SubscriptionPlan.PRO,
    });

    return {
      subscriptionPlan: user.subscriptionPlan,
    };
  }
  async cancel(id: string): Promise<boolean> {
    const user = await this.realUserRepository.updateUser(id, {
      subscriptionPlan: SubscriptionPlan.FREE,
    });

    return !!user.subscriptionPlan;
  }
}
