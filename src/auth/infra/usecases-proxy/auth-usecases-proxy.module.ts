import { DynamicModule, Module } from '@nestjs/common';

import { createUseCaseProvider } from '@common/config/usecase-proxy.config';
import { GenerateAccessTokenUseCase } from '@auth/application/use-cases/generate-access-token.usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateRefreshTokenUseCase } from '@auth/application/use-cases/generate-refresh-token.usecase';
import { UuidGeneratorService } from '@auth/infra/adapters/uuid-generator.service';

@Module({})
export class AuthUseCasesProxyModule {
  static POST_GEN_ACCESS_USECASES_PROXY = 'postGenAccessUseCasesProxy';
  static POST_GEN_REFRESH_USECASES_PROXY = 'postGenRefreshUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: AuthUseCasesProxyModule,
      imports: [
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: configService.get<string>('EXPIRES_IN'),
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        createUseCaseProvider(
          this.POST_GEN_ACCESS_USECASES_PROXY,
          GenerateAccessTokenUseCase,
          [JwtService],
        ),
        createUseCaseProvider(
          this.POST_GEN_REFRESH_USECASES_PROXY,
          GenerateRefreshTokenUseCase,
          [UuidGeneratorService],
        ),
        UuidGeneratorService,
      ],
      exports: [
        this.POST_GEN_ACCESS_USECASES_PROXY,
        this.POST_GEN_REFRESH_USECASES_PROXY,
      ],
    };
  }
}
