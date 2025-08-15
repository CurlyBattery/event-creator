import { Module } from '@nestjs/common';
import { UserRepository } from '@user/infra/ports/user.repository';
import { RealUserRepository } from '@user/infra/adapters/repositories/user/real-user.repository';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: RealUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
