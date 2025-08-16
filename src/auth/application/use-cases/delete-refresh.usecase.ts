import { RefreshRepository } from '@auth/infra/ports/refresh.repository';
import { Inject } from '@nestjs/common';

export class DeleteRefreshUseCase {
  constructor(
    @Inject(RefreshRepository)
    private readonly refreshRepository: RefreshRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const refresh = await this.refreshRepository.getRefreshById(uuid);
    if (!refresh) {
      return;
    }
    await this.refreshRepository.removeRefresh(uuid);
  }
}
