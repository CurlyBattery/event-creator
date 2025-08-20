import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  places?: number;
}
