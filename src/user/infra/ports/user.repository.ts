import { UserM } from '@user/domain/model/user';

export abstract class UserRepository {
  abstract insert(user: UserM): Promise<UserM>;
  abstract getUserByEmail(email: string): Promise<UserM>;
  abstract getUserById(id: string): Promise<UserM>;
  abstract getUsers(): Promise<UserM[]>;
  abstract updateUser(
    id: string,
    user: Partial<Omit<UserM, 'password'>>,
  ): Promise<UserM>;
  abstract removeUser(id: string): Promise<UserM>;
}
