import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsMatchPasswords } from '@common/validators/match-passwords.validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ example: 'asdfjkl' })
  password: string;

  @Validate(IsMatchPasswords)
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ example: 'asdfjkl' })
  repeatPassword: string;
}
