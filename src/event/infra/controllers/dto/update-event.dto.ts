import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  places?: number;
}
