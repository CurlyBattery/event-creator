import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AbstractException,
  IFormatExceptionMessage,
} from '@common/exceptions/domain/exception';

@Injectable()
export class ExceptionsService implements AbstractException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }

  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }

  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }

  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }

  notFoundException(data?: IFormatExceptionMessage): void {
    throw new NotFoundException(data);
  }

  conflictException(data?: IFormatExceptionMessage): void {
    throw new ConflictException(data);
  }
}
