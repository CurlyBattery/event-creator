import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  @ApiProperty({ example: 'Success' })
  message: string;
}
