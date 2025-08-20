import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RescheduleDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  newDate: Date;
}
