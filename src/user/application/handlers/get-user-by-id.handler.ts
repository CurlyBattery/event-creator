import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { UserUseCasesProxyModule } from '@user/infra/usecases-proxy/user-usecases-proxy.module';
import { UseCaseProxy } from '@common/usecase-proxy/domain/use-case-proxy';
import { GetUserByIdUseCase } from '@user/application/use-cases/get-user-by-id.usecase';
import { GetUserByIdQuery } from '@auth/application/queries/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(UserUseCasesProxyModule.GET_USER_BY_ID_USECASES_PROXY)
    private readonly getUserByIdUseCasesProxy: UseCaseProxy<GetUserByIdUseCase>,
  ) {}

  async execute(query: GetUserByIdQuery) {
    const user = await this.getUserByIdUseCasesProxy
      .getInstance()
      .execute(query.userId);
    return user;
  }
}
