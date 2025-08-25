import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserWithoutPassword {
  @ApiProperty({ example: 'uuid' })
  id?: string;

  @ApiProperty({ example: 'defaultmail@gmail.com' })
  email: string;

  @ApiPropertyOptional({ example: true })
  isVerified?: boolean;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
