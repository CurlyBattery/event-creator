import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthUseCasesProxyModule } from '@auth/infra/usecases-proxy/auth-usecases-proxy.module';
import { AuthController } from '@auth/infra/controllers/auth.controller';
import { AuthService } from '@auth/infra/ports/auth.service';
import { RealAuthService } from '@auth/infra/adapters/real-auth.service';
import { HashingService } from '@auth/infra/ports/hashing.service';
import { RealHashingService } from '@auth/infra/adapters/real-hashing.service';
import { JwtStrategy } from '@auth/infra/strategies/jwt.strategy';
import { PrismaModule } from '@common/database/prisma.module';
import { RefreshRepositoryModule } from '@auth/infra/adapters/repositories/refresh-repository.module';
import { LocalStrategy } from '@auth/infra/strategies/local.strategy';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

const Strategies = [JwtStrategy, LocalStrategy];

@Module({
  imports: [
    CqrsModule,
    AuthUseCasesProxyModule.register(),
    PrismaModule,
    RefreshRepositoryModule,
    ExceptionsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
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
    ...Strategies,
  ],
  exports: [],
})
export class AuthModule {}
