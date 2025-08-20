import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  places: number;
}
