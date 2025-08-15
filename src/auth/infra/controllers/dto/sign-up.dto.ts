import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsMatchPasswords } from '@common/validators/match-passwords.validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  // сделать repeat password
  @Validate(IsMatchPasswords)
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  repeatPassword: string;
}
