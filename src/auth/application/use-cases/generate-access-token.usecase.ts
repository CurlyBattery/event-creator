// генерация акцес токена
import { JwtService } from '@nestjs/jwt';

export class GenerateAccessTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(userId: string) {
    // генерация jwt access токена
    const payload = { sub: userId };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
