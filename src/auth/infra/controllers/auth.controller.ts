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
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { SignUpDto } from '@auth/infra/controllers/dto/sign-up.dto';
import { JwtGuard } from '@auth/infra/guards/jwt.guard';
import { AccessTokenPayload } from '@auth/infra/types/access-token.payload';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { AuthService } from '@auth/infra/ports/auth.service';
import { ConfigService } from '@nestjs/config';
import { LocalGuard } from '@auth/infra/guards/local.guard';
import { SignInDto } from '@auth/infra/controllers/dto/sign-in.dto';
import { Cookies } from '@common/decorators/cookie.decorator';

export const REFRESH_TOKEN = 'refreshtoken';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-up')
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
  authenticate(@AuthUser() user: AccessTokenPayload) {
    return user;
  }

  @UseGuards(LocalGuard)
  @Post('sign-in')
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

  @Post('log-out')
  async logout(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout({ uuid: refreshToken });

    this.removeRefreshTokenFromCookie(response);

    return { message: 'Successfully logged out' };
  }

  @Post('refresh-tokens')
  async refreshTokens(@Cookies(REFRESH_TOKEN) refreshToken: string) {
    return this.authService.refreshTokens({ uuid: refreshToken });
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
