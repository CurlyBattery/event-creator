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
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @Validate(IsMatchPasswords)
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty()
  repeatPassword: string;
}
