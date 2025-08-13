import { Module } from '@nestjs/common';
import { RealUserRepository } from '@user/infra/adapters/repositories/real-user.repository';
import { UserRepository } from '@user/infra/ports/user.repository';

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
