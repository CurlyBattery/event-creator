import { RefreshRepository } from '@auth/infra/ports/refresh.repository';
import { Inject } from '@nestjs/common';
import { RefreshTokenM } from '@auth/domain/model/refresh-token';

export class UpdateRefreshUseCase {
  constructor(
    @Inject(RefreshRepository)
    private readonly refreshRepository: RefreshRepository,
  ) {}

  async execute(refresh: RefreshTokenM): Promise<RefreshTokenM> {
    return await this.refreshRepository.updateRefresh(refresh);
  }
}
