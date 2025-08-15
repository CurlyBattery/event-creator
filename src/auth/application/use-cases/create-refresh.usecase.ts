import { Inject } from '@nestjs/common';
import { addMilliseconds } from 'date-fns';
import { QueryBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';

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
    private readonly configService: ConfigService,
  ) {}

  async execute(refresh: RefreshTokenM): Promise<RefreshTokenM> {
    const user = await this.queryBus.execute(
      new GetUserByIdQuery(refresh.userId),
    );
    if (!user) {
      this.exceptionService.notFoundException({
        message: 'User Not Found',
        codeError: 404,
      });
    }
    const ageMs = Number(this.configService.get<number>('AGE_REFRESH'));
    const exp = addMilliseconds(new Date(), ageMs);

    return await this.refreshRepository.insert({
      ...refresh,
      exp,
    });
  }
}
