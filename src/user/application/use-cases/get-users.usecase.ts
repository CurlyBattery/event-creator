import { UserM } from '@user/domain/model/user';
import { UserRepository } from '@user/infra/ports/user.repository';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserM[]> {
    return this.userRepository.getUsers();
  }
}
