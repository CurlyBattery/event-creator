import { Module } from '@nestjs/common';
import { AbstractUserRepository } from '@user/application/ports/user.repository';
import { PrismaUserRepository } from '@user/infra/repositories/prismaUser.repository';

@Module({
  providers: [
    {
      provide: AbstractUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AbstractUserRepository],
})
export class UserRepositoryModule {}
