import { DynamicModule, Module } from '@nestjs/common';

import { createUseCaseProvider } from '@common/config/usecase-proxy.config';
import { GenerateAccessTokenUseCase } from '@auth/application/use-cases/generate-access-token.usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateRefreshTokenUseCase } from '@auth/application/use-cases/generate-refresh-token.usecase';
import { UuidGeneratorService } from '@auth/infra/adapters/uuid-generator.service';
import { CreateRefreshUseCase } from '@auth/application/use-cases/create-refresh.usecase';
import { RefreshRepository } from '@auth/infra/ports/refresh.repository';
import { AbstractException } from '@common/exceptions/domain/exception';
import { RefreshRepositoryModule } from '@auth/infra/adapters/repositories/refresh-repository.module';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { ExceptionsModule } from '@common/exceptions/exceptions.module';

@Module({})
export class AuthUseCasesProxyModule {
  static POST_GEN_ACCESS_USECASES_PROXY = 'postGenAccessUseCasesProxy';
  static POST_GEN_REFRESH_USECASES_PROXY = 'postGenRefreshUseCasesProxy';
  static POST_SAVE_REFRESH_USECASES_PROXY = 'postSaveRefreshUseCasesProxy';

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
        RefreshRepositoryModule,
        ExceptionsModule,
        CqrsModule,
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
        createUseCaseProvider(
          this.POST_SAVE_REFRESH_USECASES_PROXY,
          CreateRefreshUseCase,
          [RefreshRepository, AbstractException, QueryBus, ConfigService],
        ),
        UuidGeneratorService,
      ],
      exports: [
        this.POST_GEN_ACCESS_USECASES_PROXY,
        this.POST_GEN_REFRESH_USECASES_PROXY,
        this.POST_SAVE_REFRESH_USECASES_PROXY,
      ],
    };
  }
}
