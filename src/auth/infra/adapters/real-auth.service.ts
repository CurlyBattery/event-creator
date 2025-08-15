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
import { CreateRefreshUseCase } from '@auth/application/use-cases/create-refresh.usecase';
import { ConfigService } from '@nestjs/config';
import { addMilliseconds } from 'date-fns';
import { RefreshTokenM } from '@auth/domain/model/refresh-token';
import { DeleteRefreshUseCase } from '@auth/application/use-cases/delete-refresh.usecase';

@Injectable()
export class RealAuthService implements AuthService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly configService: ConfigService,
    @Inject(HashingService) private readonly hashingService: HashingService,
    @Inject(AuthUseCasesProxyModule.POST_GEN_ACCESS_USECASES_PROXY)
    private readonly generateAccessTokenUseCaseProxy: UseCaseProxy<GenerateAccessTokenUseCase>,
    @Inject(AuthUseCasesProxyModule.POST_GEN_REFRESH_USECASES_PROXY)
    private readonly generateRefreshTokenUseCaseProxy: UseCaseProxy<GenerateRefreshTokenUseCase>,
    @Inject(AuthUseCasesProxyModule.POST_SAVE_REFRESH_USECASES_PROXY)
    private readonly createRefreshTokenUseCaseProxy: UseCaseProxy<CreateRefreshUseCase>,
    @Inject(AuthUseCasesProxyModule.PATCH_REFRESH_USECASES_PROXY)
    private readonly updateRefreshTokenUseCaseProxy: UseCaseProxy<CreateRefreshUseCase>,
    @Inject(AuthUseCasesProxyModule.DELETE_REFRESH_USECASES_PROXY)
    private readonly deleteRefreshTokenUseCaseProxy: UseCaseProxy<DeleteRefreshUseCase>,
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
    // хэширование пароля
    const hashedPassword = await this.hashingService.hashPlain(password);

    const user = await this.commandBus.execute(
      new CreateUserCommand(email, hashedPassword),
    );

    const { accessToken, refreshToken } = await this.issuingTokens(user);

    // хширование refresh токена
    const hashedRefreshToken = refreshToken;

    const exp = this.getExp();

    // сохранение рефреш токена
    await this.createRefreshTokenUseCaseProxy
      .getInstance()
      .execute({ uuid: hashedRefreshToken, userId: user.id, exp });

    return { accessToken, refreshToken };
  }

  async login(email: string): Promise<TokensM> {
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email));

    const { accessToken, refreshToken } = await this.issuingTokens(user);

    const hashedRefreshToken = refreshToken;

    // обновление рефреш токена пользователя
    const exp = this.getExp();

    await this.updateRefreshTokenUseCaseProxy
      .getInstance()
      .execute({ uuid: hashedRefreshToken, userId: user.id, exp });

    return { accessToken, refreshToken };
  }

  async logout(
    refresh: Omit<RefreshTokenM, 'userId'>,
  ): Promise<{ message: string }> {
    // удаление рефреш токена из бд по refresh токену
    await this.deleteRefreshTokenUseCaseProxy
      .getInstance()
      .execute(refresh.uuid);

    return { message: 'Successfully logged out' };
  }

  private async issuingTokens(user: UserM): Promise<TokensM> {
    const accessToken = await this.generateAccessTokenUseCaseProxy
      .getInstance()
      .execute(user.id);
    const refreshToken = await this.generateRefreshTokenUseCaseProxy
      .getInstance()
      .execute();

    return { accessToken, refreshToken };
  }

  private getExp(): Date {
    const ageMs = Number(this.configService.get<number>('AGE_REFRESH'));
    const exp = addMilliseconds(new Date(), ageMs);
    return exp;
  }
}
