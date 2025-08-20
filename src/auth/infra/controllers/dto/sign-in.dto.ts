import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'asdfjkl' })
  password: string;
}
