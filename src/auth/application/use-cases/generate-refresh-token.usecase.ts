import { UuidGeneratorService } from '@auth/infra/adapters/uuid-generator.service';

export class GenerateRefreshTokenUseCase {
  constructor(private readonly uuidGeneratorService: UuidGeneratorService) {}

  async execute() {
    const refreshToken = this.uuidGeneratorService.generateUUID();
    return refreshToken;
  }
}
