import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '@auth/infra/ports/auth.service';
import { UserM } from '@user/domain/model/user';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '@auth/application/queries/get-user-by-email.query';
import { HashingService } from '@auth/infra/ports/hashing.service';
import { TokensM } from '@auth/domain/model/tokens';
import { CreateUserCommand } from '@auth/application/commands/sign-up.command';
import { AuthUseCasesProxyModule } from '@auth/infra/usecases-proxy/auth-usecases-proxy.module';
import { UseCaseProxy } from '@common/usecase-proxy/domain/use-case-proxy';
import { GenerateAccessTokenUseCase } from '@auth/application/use-cases/generate-access-token.usecase';
import { GenerateRefreshTokenUseCase } from '@auth/application/use-cases/generate-refresh-token.usecase';

@Injectable()
export class RealAuthService implements AuthService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject(HashingService) private readonly hashingService: HashingService,
    @Inject(AuthUseCasesProxyModule.POST_GEN_ACCESS_USECASES_PROXY)
    private readonly generateAccessTokenUseCaseProxy: UseCaseProxy<GenerateAccessTokenUseCase>,
    @Inject(AuthUseCasesProxyModule.POST_GEN_REFRESH_USECASES_PROXY)
    private readonly generateRefreshTokenUseCaseProxy: UseCaseProxy<GenerateRefreshTokenUseCase>,
  ) {}

  async validateUser(email: string, password: string): Promise<UserM> {
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email));
    if (!user) return null;

    const isPasswordValid = await this.hashingService.assertSame(
      password,
      user.password,
    );
    return isPasswordValid ? user : null;
  }

  async register(email: string, password: string): Promise<TokensM> {
    // генерация refresh токена
    const refreshToken = await this.generateRefreshTokenUseCaseProxy
      .getInstance()
      .execute();

    // хэширование пароля
    const hashedPassword = await this.hashingService.hashPlain(password);

    // хширование refresh токена
    const hashedRefreshToken =
      await this.hashingService.hashPlain(refreshToken);

    const user = await this.commandBus.execute(
      new CreateUserCommand(email, hashedRefreshToken, hashedPassword),
    );
    console.log(user);

    // генерация access токена
    const accessToken = await this.generateAccessTokenUseCaseProxy
      .getInstance()
      .execute(user.id);

    console.log(accessToken);
    return { accessToken, refreshToken };
  }
}
