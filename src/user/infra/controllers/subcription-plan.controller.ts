import { Controller, Patch } from '@nestjs/common';
import { SubscriptionPlanService } from '@user/infra/ports/subscription-plan.service';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { AccessTokenPayload } from '@auth/infra/types/access-token.payload';

@Controller()
export class SubscriptionPLanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Patch('upgrade')
  upgrade(@AuthUser() user: AccessTokenPayload) {
    return this.subscriptionPlanService.upgrade(user.sub);
  }

  @Patch('me')
  me(@AuthUser() user: AccessTokenPayload) {
    return this.subscriptionPlanService.me(user.sub);
  }

  @Patch('cancel')
  cancel(@AuthUser() user: AccessTokenPayload) {
    return this.subscriptionPlanService.cancel(user.sub);
  }
}
