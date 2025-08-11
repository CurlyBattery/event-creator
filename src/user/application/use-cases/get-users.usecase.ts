import { AbstractUserRepository } from '@user/application/ports/user.repository';
import { UserM } from '@user/domain/model/user';

export class GetUsersUseCase {
  constructor(private readonly userRepository: AbstractUserRepository) {}

  async execute(): Promise<UserM[]> {
    return this.userRepository.getUsers();
  }
}
