import { AbstractUserRepository } from '@user/application/ports/user.repository';
import { UserM } from '@user/domain/model/user';
import { AbstractException } from '@common/exceptions/domain/exception';

export class GetUserByIdUseCase {
  constructor(
    private readonly userRepository: AbstractUserRepository,
    private readonly exceptionsService: AbstractException,
  ) {}

  async execute(id: string): Promise<UserM> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      this.exceptionsService.badRequestException({
        message: 'User Not Found',
        codeError: 404,
      });
    }
    return user;
  }
}
