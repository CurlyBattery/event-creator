import { AbstractUserRepository } from '@user/application/ports/user.repository';
import { AbstractLogger } from '@common/logger/domain/logger';
import { UserM } from '@user/domain/model/user';
import { Inject } from '@nestjs/common';
import { AbstractException } from '@common/exceptions/domain/exception';

export class UpdateUserUseCase {
  constructor(
    @Inject(AbstractUserRepository)
    private readonly userRepository: AbstractUserRepository,
    @Inject(AbstractLogger)
    private readonly logger: AbstractLogger,
    private readonly exceptionsService: AbstractException,
  ) {}

  async execute(id: string, user: Omit<UserM, 'password'>) {
    try {
      const exists = await this.userRepository.getUserById(id);
      if (!exists) {
        this.exceptionsService.notFoundException({
          message: 'User Not Found',
          codeError: 404,
        });
      }

      const updated = await this.userRepository.updateUser(id, user);
      this.logger.log(
        `${UpdateUserUseCase.name} execute`,
        'User have been updated',
      );
      return updated;
    } catch {
      this.exceptionsService.badRequestException({
        message: 'Failed To Update User',
        codeError: 400,
      });
    }
  }
}
