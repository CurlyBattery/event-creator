import { Module } from '@nestjs/common';

import { UserUseCasesProxyModule } from '@user/infra/usecases-proxy/user-usecases-proxy.module';
import { UserController } from '@user/infra/controllers/user.controller';
import { LoggerModule } from '@common/logger/logger.module';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from '@user/application/handlers/create-user.handler';
import { UserRepositoryModule } from '@user/infra/adapters/repositories/user-repository.module';

@Module({
  imports: [
    UserUseCasesProxyModule.register(),
    UserRepositoryModule,
    LoggerModule,
    ExceptionsModule,
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [CreateUserHandler],
})
export class UserModule {}
