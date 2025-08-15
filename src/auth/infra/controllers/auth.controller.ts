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
    // размещение рефреш токена в куки
    response.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: this.configService.get<number>('AGE_REFRESH_COOKIE'),
      secure:
        this.configService.get<string>('NODE_ENV', 'development') ===
        'production',
      path: '/',
    });

    response.status(HttpStatus.CREATED).json({ accessToken, refreshToken });
  }

  @UseGuards(JwtGuard)
  @Get('me')
  authenticate(@AuthUser() user: AccessTokenPayload) {
    return user;
  }

  // @UseGuards(LocalGuard)
  // @Post('sign-in')
  // signIn(@Body() signInDto: SignInDto) {
  //   // проверка соотвествия пароля с тем что есть в бд
  //   // создание access токена
  //   // создание refresh токена
  //   // перезапись refresh токена в бд
  //   // выдача токенов
  //   // размещение рефреш токена в cookie
  //   // ывзвращение токенов
  // }
}
