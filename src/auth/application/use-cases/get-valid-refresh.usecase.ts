import { RefreshRepository } from '@auth/infra/ports/refresh.repository';
import { Inject } from '@nestjs/common';
import { AbstractException } from '@common/exceptions/domain/exception';

export class GetValidRefreshUseCase {
  constructor(
    @Inject(RefreshRepository)
    private readonly refreshRepository: RefreshRepository,
    @Inject(AbstractException)
    private readonly exceptionService: AbstractException,
  ) {}

  async execute(uuid: string) {
    const refresh = await this.refreshRepository.getRefreshById(uuid);

    if (!refresh) {
      this.exceptionService.notFoundException({
        message: 'Not Found Refresh Token',
        codeError: 404,
      });
    }

    if (refresh.exp < new Date()) {
      this.exceptionService.unauthorizedException({
        message: 'Token Expired',
        codeError: 402,
      });
    }

    return refresh;
  }
}
