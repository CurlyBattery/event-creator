import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SubscriptionPlan {
  FREE,
  PRO,
}

export class UserWithoutPassword {
  @ApiProperty({ example: 'uuid' })
  id?: string;

  @ApiProperty({ example: 'defaultmail@gmail.com' })
  email: string;

  @ApiProperty({ example: 'FREE', default: SubscriptionPlan.FREE })
  subscriptionPlan: SubscriptionPlan[];

  @ApiPropertyOptional({ example: true })
  isVerified?: boolean;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
