// получение post запроса на sign-up
// отправлние команды на создание пользователя
// если не создан кидаем ошибку
// вызываем use-case генерации токенов
// помещаем refresh_token в cookie
// возвращаем access и refresh токены

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { SignUpDto } from '@auth/infra/controllers/dto/sign-up.dto';
import { JwtGuard } from '@auth/infra/guards/jwt.guard';
import {
  AccessTokenPayload,
  AccessTokenPayloadDto,
} from '@auth/infra/types/access-token.payload';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { AuthService } from '@auth/infra/ports/auth.service';
import { ConfigService } from '@nestjs/config';
import { LocalGuard } from '@auth/infra/guards/local.guard';
import { SignInDto } from '@auth/infra/controllers/dto/sign-in.dto';
import { Cookies } from '@common/decorators/cookie.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TokensM } from '@auth/domain/model/tokens';
import { SuccessDto } from '@common/dtos/success.dto';
import { ValidateCodeDto } from '@auth/infra/controllers/dto/validate-code.dto';
import { VerificationService } from '@auth/infra/ports/verification.service';

export const REFRESH_TOKEN = 'refreshtoken';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(VerificationService)
    private readonly verificationService: VerificationService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({
    type: SignUpDto,
  })
  @ApiCreatedResponse({ type: TokensM })
  @ApiConflictResponse({
    description: 'Пользователь с таким email используется',
  })
  async signUp(@Body() signUpDto: SignUpDto, @Res() response: Response) {
    const { email, password } = signUpDto;

    const { accessToken, refreshToken } = await this.authService.register(
      email,
      password,
    );
    this.setRefreshTokenToCookie(response, refreshToken);

    response.status(HttpStatus.CREATED).json({ accessToken, refreshToken });
  }

  @UseGuards(JwtGuard)
  @Get('me')
  @ApiOperation({ summary: 'Получить данные пользователя из токена' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Нужно войти в систему' })
  @ApiOkResponse({ type: AccessTokenPayloadDto })
  authenticate(@AuthUser() user: AccessTokenPayload) {
    return user;
  }

  @UseGuards(LocalGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Вход в систему и получение access и refresh токенов',
  })
  @ApiBody({ type: SignInDto })
  @ApiUnauthorizedResponse({
    description: 'Пароль не совпадает с паролем в бд',
  })
  @ApiNotFoundResponse({
    description: 'Пользователь не найден с введенным email',
  })
  @ApiOkResponse({ type: TokensM })
  async signIn(
    @Body() { email }: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // создание access токена
    // создание refresh токена
    // перезапись refresh токена в бд
    // выдача токенов
    const { accessToken, refreshToken } = await this.authService.login(email);
    // размещение рефреш токена в cookie
    this.setRefreshTokenToCookie(response, refreshToken);
    // возвращение токенов
    response.status(HttpStatus.CREATED).json({ accessToken, refreshToken });
  }

  @UseGuards(JwtGuard)
  @Post('log-out')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удаление refresh токена из бд и cookie. Выход из системы',
  })
  @ApiUnauthorizedResponse({ description: 'Нужно войти в систему' })
  @ApiOkResponse({ type: SuccessDto })
  async logout(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout({ uuid: refreshToken });

    this.removeRefreshTokenFromCookie(response);

    return { message: 'Successfully logged out' };
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получить новую пару токенов по refresh токену из cookie',
  })
  @ApiNotFoundResponse({ description: 'Refresh токен не найден в бд' })
  @ApiUnauthorizedResponse({
    description: 'У refresh токена истек срок действия',
  })
  @ApiOkResponse({ type: TokensM })
  async refreshTokens(@Cookies(REFRESH_TOKEN) refreshToken: string) {
    return this.authService.refreshTokens({ uuid: refreshToken });
  }

  // добавить сваггер
  @UseGuards(JwtGuard)
  @Post('verification')
  async verificationAccount(@AuthUser() user: AccessTokenPayload) {
    // сгенерировать код
    // upsert код и время жизни в бд
    // отправить на почту user.email код и ссылку на frontend страницу с вводом кода и запросом на validateCode()
    // вернуть сообщение о успешном отправлении
    await this.verificationService.generateCode(user);
    return { message: 'Code Send To Mail' };
  }

  // добавить сваггер
  @UseGuards(JwtGuard)
  @Post('validate-code')
  async validateCode(
    @Body() dto: ValidateCodeDto,
    @AuthUser() user: AccessTokenPayload,
  ) {
    // принимаем код
    // сравнием с тем что в бд
    // если свопадает, обновляем по id у User поле isVerified в true(отправляем команду cqrs), и если время не вышло
    // если нет кидаем ошибку bad request
    await this.verificationService.verifyCode(user.sub, dto.code);
    return { message: 'Account Verified' };
  }

  setRefreshTokenToCookie(response: Response, refreshToken: string) {
    response.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('AGE_REFRESH'),
    });
  }

  removeRefreshTokenFromCookie(response: Response) {
    response.clearCookie(REFRESH_TOKEN);
  }
}
