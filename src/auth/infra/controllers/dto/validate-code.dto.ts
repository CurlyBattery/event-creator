import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateCodeDto {
  @IsNumber()
  @MaxLength(6)
  @IsNotEmpty()
  @ApiProperty({ example: 123456 })
  code: number;
}
