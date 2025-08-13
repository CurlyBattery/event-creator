import { UserM } from '@user/domain/model/user';
import { AbstractException } from '@common/exceptions/domain/exception';
import { Inject } from '@nestjs/common';
import { UserRepository } from '@user/infra/ports/user.repository';

export class GetUserByEmailUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
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
