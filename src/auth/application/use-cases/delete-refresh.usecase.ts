import { RefreshRepository } from '@auth/infra/ports/refresh.repository';
import { Inject } from '@nestjs/common';
import { RefreshTokenM } from '@auth/domain/model/refresh-token';
import { AbstractException } from '@common/exceptions/domain/exception';

export class DeleteRefreshUseCase {
  constructor(
    @Inject(RefreshRepository)
    private readonly refreshRepository: RefreshRepository,
    @Inject(AbstractException)
    private readonly exceptionService: AbstractException,
  ) {}

  async execute(uuid: string): Promise<RefreshTokenM> {
    const refresh = await this.refreshRepository.getRefreshById(uuid);
    if (!refresh) {
      this.exceptionService.notFoundException({ message: 'Refresh Not Found' });
    }
    return await this.refreshRepository.removeRefresh(uuid);
  }
}
