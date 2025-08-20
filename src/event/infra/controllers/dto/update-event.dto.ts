import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'updatedtitle', required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'updateddescription', required: false })
  description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 101, required: false })
  places?: number;
}
