import { UserM } from '@user/domain/model/user';
import { AbstractException } from '@common/exceptions/domain/exception';
import { UserRepository } from '@user/infra/ports/user.repository';

export class GetUserByIdUseCase {
  constructor(
    private readonly userRepository: UserRepository,
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
