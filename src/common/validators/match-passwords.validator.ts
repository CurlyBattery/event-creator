import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SignUpDto } from '@auth/infra/controllers/dto/sign-up.dto';

@ValidatorConstraint({ async: false })
export class IsMatchPasswords implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const obj = validationArguments.object as SignUpDto;
    return value === obj.password;
  }
  defaultMessage(): string {
    return 'passwords do not match';
  }
}
