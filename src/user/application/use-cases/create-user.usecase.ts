import { AbstractLogger } from '@common/logger/domain/logger';
import { Inject } from '@nestjs/common';
import { AbstractUserRepository } from '@user/application/ports/user.repository';
import { UserM } from '@user/domain/model/user';
import { AbstractException } from '@common/exceptions/domain/exception';

export class CreateUserUseCase {
  constructor(
    @Inject(AbstractLogger) private logger: AbstractLogger,
    @Inject(AbstractUserRepository)
    private readonly userRepository: AbstractUserRepository,
    @Inject(AbstractException)
    private readonly exceptionsService: AbstractException,
  ) {}

  async execute(user: UserM): Promise<UserM> {
    const exists = await this.userRepository.getUserByEmail(user.email);
    if (exists) {
      this.exceptionsService.conflictException({
        message: 'User Already Exists',
        codeError: 409,
      });
    }

    const result = await this.userRepository.insert(user);
    this.logger.log(
      `${CreateUserUseCase.name} execute`,
      'New user have been inserted',
    );
    return result;
  }
}
