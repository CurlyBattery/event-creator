import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  places: number;
}
