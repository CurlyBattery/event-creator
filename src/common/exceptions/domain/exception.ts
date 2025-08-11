export interface IFormatExceptionMessage {
  message: string;
  codeError?: number;
}

export abstract class AbstractException {
  abstract badRequestException(data: IFormatExceptionMessage): void;
  abstract internalServerErrorException(data?: IFormatExceptionMessage): void;
  abstract forbiddenException(data?: IFormatExceptionMessage): void;
  abstract unauthorizedException(data?: IFormatExceptionMessage): void;
  abstract notFoundException(data?: IFormatExceptionMessage): void;
  abstract conflictException(data?: IFormatExceptionMessage): void;
}
