import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '@auth/application/queries/get-user-by-email.query';
import { UseCaseProxy } from '@common/usecase-proxy/domain/use-case-proxy';
import { GetUserByEmailUseCase } from '@user/application/use-cases/get-user-by-email.usecase';
import { Inject } from '@nestjs/common';
import { UserUseCasesProxyModule } from '@user/infra/usecases-proxy/user-usecases-proxy.module';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @Inject(UserUseCasesProxyModule.GET_USER_BY_EMAIL_USECASES_PROXY)
    private readonly getUserByEmailUseCasesProxy: UseCaseProxy<GetUserByEmailUseCase>,
  ) {}

  async execute(query: GetUserByEmailQuery) {
    const user = await this.getUserByEmailUseCasesProxy
      .getInstance()
      .execute(query.email);
    return user;
  }
}
