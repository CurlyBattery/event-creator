import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubscriptionPlan } from '../../../../generated/prisma';
import { SubscriptionPlanM } from '@user/domain/model/subscription-plan';

export class UserWithoutPassword {
  @ApiProperty({ example: 'uuid' })
  id?: string;

  @ApiProperty({ example: 'defaultmail@gmail.com' })
  email: string;

  @ApiPropertyOptional({ example: true })
  isVerified?: boolean;

  @ApiPropertyOptional({ example: SubscriptionPlanM.FREE })
  subscriptionPlan?: SubscriptionPlan;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
