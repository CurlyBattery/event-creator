import { ApiProperty } from '@nestjs/swagger';

export type AccessTokenPayload = {
  sub: string;
};

export class AccessTokenPayloadDto implements AccessTokenPayload {
  @ApiProperty({ example: 'uuidauthuser' })
  sub: string;

  @ApiProperty({ example: 1234, description: 'Время, когда был создан токен' })
  iat?: number;

  @ApiProperty({ example: 5678, description: 'Время, когда токен истечет' })
  exp: number;
}
