import { IsNotEmpty, IsNumber, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateCodeDto {
  @IsNumber()
  @Max(999999)
  @IsNotEmpty()
  @ApiProperty({ example: 123456 })
  code: number;
}
