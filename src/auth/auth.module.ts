import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthUseCasesProxyModule } from '@auth/infra/usecases-proxy/auth-usecases-proxy.module';
import { AuthController } from '@auth/infra/controllers/auth.controller';
import { AuthService } from '@auth/infra/ports/auth.service';
import { RealAuthService } from '@auth/infra/adapters/real-auth.service';
import { HashingService } from '@auth/infra/ports/hashing.service';
import { RealHashingService } from '@auth/infra/adapters/real-hashing.service';
import { JwtStrategy } from '@auth/infra/strategies/jwt.strategy';

@Module({
  imports: [CqrsModule, AuthUseCasesProxyModule.register()],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useClass: RealAuthService,
    },
    {
      provide: HashingService,
      useClass: RealHashingService,
    },
    JwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
