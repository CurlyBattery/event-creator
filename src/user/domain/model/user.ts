import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubcriptionPlan } from '@user/domain/events/subcription-plan';
import { SubscriptionPlan } from '../../../../generated/prisma';

export class UserWithoutPassword {
  @ApiProperty({ example: 'uuid' })
  id?: string;

  @ApiProperty({ example: 'defaultmail@gmail.com' })
  email: string;

  @ApiPropertyOptional({ example: true })
  isVerified?: boolean;

  @ApiPropertyOptional({ example: SubcriptionPlan.FREE })
  subscriptionPlan?: SubscriptionPlan;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
