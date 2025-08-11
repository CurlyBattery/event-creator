import { AbstractUserRepository } from '@user/application/ports/user.repository';
import { AbstractLogger } from '@common/logger/domain/logger';
import { AbstractException } from '@common/exceptions/domain/exception';
import { Inject } from '@nestjs/common';

export class RemoveUserUseCase {
  constructor(
    @Inject(AbstractUserRepository)
    private readonly userRepository: AbstractUserRepository,
    @Inject(AbstractLogger)
    private readonly logger: AbstractLogger,
    @Inject(AbstractException)
    private readonly exceptionsService: AbstractException,
  ) {}

  async execute(id: string) {
    try {
      const exists = await this.userRepository.getUserById(id);
      if (!exists) {
        this.exceptionsService.notFoundException({
          message: 'User Not Found',
        });
      }

      const deleted = await this.userRepository.removeUser(id);
      this.logger.log(
        `${RemoveUserUseCase.name} execute`,
        'User successfully deleted',
      );
      return deleted;
    } catch {
      this.exceptionsService.badRequestException({
        message: 'Failed To Delete User',
      });
    }
  }
}
