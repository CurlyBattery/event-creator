import { Inject, Injectable } from '@nestjs/common';
import { VerificationService } from '@auth/infra/ports/verification.service';
import { UserVerificationRepository } from '@auth/infra/ports/user-verification.repository';

@Injectable()
export class RealVerificationService implements VerificationService {
  constructor(
    @Inject(UserVerificationRepository)
    private readonly userVerificationRepository: UserVerificationRepository,
  ) {}

  async generateCode(userId: string): Promise<void> {
    throw new Error(
      `${userId} not implmented and ${this.userVerificationRepository}`,
    );
  }
  async verifyCode(userId: string, code: number): Promise<void> {
    throw new Error(`${userId} not implemented and ${code}`);
  }
}
