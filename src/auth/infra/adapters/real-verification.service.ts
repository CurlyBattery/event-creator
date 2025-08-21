import { Inject, Injectable } from '@nestjs/common';
import { VerificationService } from '@auth/infra/ports/verification.service';
import { UserVerificationRepository } from '@auth/infra/ports/user-verification.repository';
import { ConfigService } from '@nestjs/config';
import { addMilliseconds } from 'date-fns';

@Injectable()
export class RealVerificationService implements VerificationService {
  constructor(
    @Inject(UserVerificationRepository)
    private readonly userVerificationRepository: UserVerificationRepository,
    private readonly configService: ConfigService,
  ) {}

  async generateCode(userId: string): Promise<void> {
    const randomSixDigit = await this.getOtp();
    const exp = this.getExpiresVerificationCode();

    await this.userVerificationRepository.upsertUserVerification({
      userId,
      code: randomSixDigit,
      expiresAt: exp,
    });

    // отправление на email
  }

  async verifyCode(userId: string, code: number): Promise<void> {
    throw new Error(`${userId} not implemented and ${code}`);
  }

  private getOtp(): Promise<number> {
    return Promise.resolve(Math.floor(100000 + Math.random() * 900000));
  }

  private getExpiresVerificationCode(): Date {
    const ageOtp = Number(this.configService.get<number>('EXPIRES_OTP'));
    const exp = addMilliseconds(new Date(), ageOtp);
    console.log(exp);
    return exp;
  }
}
