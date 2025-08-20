// класс с access и refresh токеном
import { ApiProperty } from '@nestjs/swagger';

export class TokensM {
  @ApiProperty({ example: 'jwtexampletoken' })
  accessToken: string;

  @ApiProperty({ example: 'uuidrefreshtoken' })
  refreshToken: string;
}
