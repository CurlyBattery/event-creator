import { UserM } from '@user/domain/model/user';
import { TokensM } from '@auth/domain/model/tokens';

export abstract class AuthService {
  abstract validateUser(email: string, password: string): Promise<UserM>;
  abstract register(email: string, password: string): Promise<TokensM>;
}
