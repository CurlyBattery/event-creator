import { RefreshTokenM } from '@auth/domain/model/refresh-token';

export abstract class RefreshRepository {
  abstract insert(refresh: RefreshTokenM): Promise<RefreshTokenM>;
  abstract getRefreshById(userId: string): Promise<RefreshTokenM>;
  abstract updateRefresh(
    refresh: Partial<RefreshTokenM>,
  ): Promise<RefreshTokenM>;
  abstract removeRefresh(uuid: string): Promise<RefreshTokenM>;
}
