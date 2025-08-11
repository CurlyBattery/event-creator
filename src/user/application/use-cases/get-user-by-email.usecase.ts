import { AbstractUserRepository } from '@user/application/ports/user.repository';
import { UserM } from '@user/domain/model/user';
import { AbstractException } from '@common/exceptions/domain/exception';
import { Inject } from '@nestjs/common';

export class GetUserByEmailUseCase {
  constructor(
    @Inject(AbstractUserRepository)
    private readonly userRepository: AbstractUserRepository,
    @Inject(AbstractException)
    private readonly exceptionsService: AbstractException,
  ) {}

  async execute(email: string): Promise<UserM> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      this.exceptionsService.notFoundException({
        message: 'User Not Found',
        codeError: 404,
      });
    }

    return user;
  }
}
