// генерация акцес токена
import { JwtService } from '@nestjs/jwt';

export class GenerateAccessTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(userId: string, email: string, isVerified: boolean) {
    // генерация jwt access токена
    const payload = { sub: userId, email, isVerified };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
