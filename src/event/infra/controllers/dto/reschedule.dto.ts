import { IsDateString, IsNotEmpty } from 'class-validator';

export class RescheduleDto {
  @IsDateString()
  @IsNotEmpty()
  newDate: Date;
}
