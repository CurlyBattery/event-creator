import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RescheduleDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2025-09-23T00:00:00.000Z' })
  newDate: Date;
}
