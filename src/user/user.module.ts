import { Module } from '@nestjs/common';

import { UserUseCasesProxyModule } from '@user/infra/usecases-proxy/user-usecases-proxy.module';
import { UserController } from '@user/infra/controllers/user.controller';
import { UserRepositoryModule } from '@user/infra/repositories/user-repository.module';
import { LoggerModule } from '@common/logger/logger.module';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';

@Module({
  imports: [
    UserUseCasesProxyModule.register(),
    UserRepositoryModule,
    LoggerModule,
    ExceptionsModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
