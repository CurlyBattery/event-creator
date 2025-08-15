import { DynamicModule, Module } from '@nestjs/common';

import { GetUserByIdUseCase } from '@user/application/use-cases/get-user-by-id.usecase';
import { GetUserByEmailUseCase } from '@user/application/use-cases/get-user-by-email.usecase';
import { CreateUserUseCase } from '@user/application/use-cases/create-user.usecase';
import { AbstractLogger } from '@common/logger/domain/logger';
import { LoggerModule } from '@common/logger/logger.module';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';
import { AbstractException } from '@common/exceptions/domain/exception';
import { createUseCaseProvider } from '@common/config/usecase-proxy.config';
import { GetUsersUseCase } from '@user/application/use-cases/get-users.usecase';
import { UpdateUserUseCase } from '@user/application/use-cases/update-user.usecase';
import { RemoveUserUseCase } from '@user/application/use-cases/remove-user.usecase';
import { UserRepository } from '@user/infra/ports/user.repository';
import { UserRepositoryModule } from '@user/infra/adapters/repositories/user/user-repository.module';

@Module({})
export class UserUseCasesProxyModule {
  static GET_USER_BY_ID_USECASES_PROXY = 'getUserByIdUseCasesProxy';
  static GET_USER_BY_EMAIL_USECASES_PROXY = 'getUserByEmailUseCasesProxy';
  static POST_USER_USECASES_PROXY = 'postUserUseCasesProxy';
  static GET_USERS_USECASES_PROXY = 'getUsersUseCasesProxy';
  static PATCH_USER_USECASES_PROXY = 'patchUserUseCasesProxy';
  static DELETE_USER_USECASES_PROXY = 'deleteUserUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UserUseCasesProxyModule,
      imports: [UserRepositoryModule, LoggerModule, ExceptionsModule],
      providers: [
        createUseCaseProvider(
          this.GET_USER_BY_ID_USECASES_PROXY,
          GetUserByIdUseCase,
          [UserRepository, AbstractException],
        ),
        createUseCaseProvider(
          this.GET_USER_BY_EMAIL_USECASES_PROXY,
          GetUserByEmailUseCase,
          [UserRepository, AbstractException],
        ),
        createUseCaseProvider(
          this.POST_USER_USECASES_PROXY,
          CreateUserUseCase,
          [AbstractLogger, UserRepository, AbstractException],
        ),
        createUseCaseProvider(this.GET_USERS_USECASES_PROXY, GetUsersUseCase, [
          UserRepository,
        ]),
        createUseCaseProvider(
          this.PATCH_USER_USECASES_PROXY,
          UpdateUserUseCase,
          [UserRepository, AbstractLogger, AbstractException],
        ),
        createUseCaseProvider(
          this.DELETE_USER_USECASES_PROXY,
          RemoveUserUseCase,
          [UserRepository, AbstractLogger, AbstractException],
        ),
      ],
      exports: [
        this.GET_USER_BY_ID_USECASES_PROXY,
        this.GET_USER_BY_EMAIL_USECASES_PROXY,
        this.POST_USER_USECASES_PROXY,
        this.GET_USERS_USECASES_PROXY,
        this.PATCH_USER_USECASES_PROXY,
        this.DELETE_USER_USECASES_PROXY,
      ],
    };
  }
}
