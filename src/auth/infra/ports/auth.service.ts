import { UserM } from '@user/domain/model/user';
import { TokensM } from '@auth/domain/model/tokens';
import { RefreshTokenM } from '@auth/domain/model/refresh-token';

export abstract class AuthService {
  abstract validateUser(email: string, password: string): Promise<UserM>;
  abstract register(email: string, password: string): Promise<TokensM>;
  abstract login(email: string): Promise<TokensM>;
  abstract logout(refresh: Omit<RefreshTokenM, 'userId'>): Promise<void>;
  abstract refreshTokens(
    refresh: Omit<RefreshTokenM, 'userId'>,
  ): Promise<TokensM>;
}
