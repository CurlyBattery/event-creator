import { Module } from '@nestjs/common';

import { UserUseCasesProxyModule } from '@user/infra/usecases-proxy/user-usecases-proxy.module';
import { UserController } from '@user/infra/controllers/user.controller';
import { LoggerModule } from '@common/logger/logger.module';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from '@user/application/handlers/create-user.handler';
import { UserRepositoryModule } from '@user/infra/adapters/repositories/user/user-repository.module';
import { GetUserByEmailHandler } from '@user/application/handlers/get-user-by-email.handler';
import { GetUserByIdHandler } from '@user/application/handlers/get-user-by-id.handler';
import { UpdateUserHandler } from '@user/application/commands/update-user.command';

const QueryHandlers = [GetUserByIdHandler, GetUserByEmailHandler];

const CommandHandlers = [CreateUserHandler, UpdateUserHandler];

@Module({
  imports: [
    UserUseCasesProxyModule.register(),
    UserRepositoryModule,
    LoggerModule,
    ExceptionsModule,
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class UserModule {}
