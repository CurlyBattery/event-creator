import { Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { RefreshRepository } from '@auth/infra/ports/refresh.repository';
import { AbstractException } from '@common/exceptions/domain/exception';
import { RefreshTokenM } from '@auth/domain/model/refresh-token';
import { GetUserByIdQuery } from '@auth/application/queries/get-user-by-id.query';

export class CreateRefreshUseCase {
  constructor(
    @Inject(RefreshRepository)
    private readonly refreshRepository: RefreshRepository,
    @Inject(AbstractException)
    private readonly exceptionService: AbstractException,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(
    refresh: RefreshTokenM & { exp: Date },
  ): Promise<RefreshTokenM> {
    const user = await this.queryBus.execute(
      new GetUserByIdQuery(refresh.userId),
    );
    if (!user) {
      this.exceptionService.notFoundException({
        message: 'User Not Found',
        codeError: 404,
      });
    }

    return await this.refreshRepository.insert(refresh);
  }
}
