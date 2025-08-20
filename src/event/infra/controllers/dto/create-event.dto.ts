import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Мероприятие номер 1' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'На этом мероприятии будут пить чай' })
  description: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2025-09-22T00:00:00.000Z' })
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  places: number;
}
