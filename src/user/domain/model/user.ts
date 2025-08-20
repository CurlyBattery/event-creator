import { ApiProperty } from '@nestjs/swagger';

export class UserWithoutPassword {
  @ApiProperty({ example: 'uuid' })
  id?: string;

  @ApiProperty({ example: 'defaultmail@gmail.com' })
  email: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
