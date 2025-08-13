import { AbstractLogger } from '@common/logger/domain/logger';
import { AbstractException } from '@common/exceptions/domain/exception';
import { Inject } from '@nestjs/common';
import { UserRepository } from '@user/infra/ports/user.repository';

export class RemoveUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
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
