import { Inject, Injectable } from '@nestjs/common';
import { VerificationService } from '@auth/infra/ports/verification.service';
import { UserVerificationRepository } from '@auth/infra/ports/user-verification.repository';
import { ConfigService } from '@nestjs/config';
import { addMilliseconds } from 'date-fns';
import { CommandBus } from '@nestjs/cqrs';
import { SendVerificationCodeEmail } from '@notifications/application/commands/send-code.command';
import { AccessTokenPayload } from '@auth/infra/types/access-token.payload';
import { AbstractException } from '@common/exceptions/domain/exception';
import { UpdateUserCommand } from '@user/application/commands/update-user.command';

@Injectable()
export class RealVerificationService implements VerificationService {
  constructor(
    @Inject(UserVerificationRepository)
    private readonly userVerificationRepository: UserVerificationRepository,
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,
    @Inject(AbstractException)
    private readonly exceptionsService: AbstractException,
  ) {}

  async generateCode(user: AccessTokenPayload): Promise<void> {
    const randomSixDigit = await this.getOtp();
    const exp = this.getExpiresVerificationCode();

    await this.userVerificationRepository.upsertUserVerification({
      userId: user.sub,
      code: randomSixDigit,
      expiresAt: exp,
    });

    // отправление на email
    try {
      await this.commandBus.execute(
        new SendVerificationCodeEmail(user.email, randomSixDigit),
      );
    } catch (e) {
      this.exceptionsService.badRequestException({
        message: 'Message not sending',
        codeError: 400,
      });
    }
  }

  async verifyCode(userId: string, code: number): Promise<void> {
    const userVerification =
      await this.userVerificationRepository.getByUserId(userId);

    if (!userVerification) {
      this.exceptionsService.badRequestException({
        message: 'First send code to email',
        codeError: 400,
      });
    }

    const isMatchCodes = userVerification.code === code;
    if (!isMatchCodes) {
      this.exceptionsService.badRequestException({
        message: 'Code not correct',
        codeError: 400,
      });
    }

    if (userVerification.expiresAt < new Date()) {
      this.exceptionsService.badRequestException({
        message: 'Code expired',
        codeError: 400,
      });
    }

    // отправить команду обновление пользователя с isVerified true
    await this.commandBus.execute(new UpdateUserCommand(true, userId));
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
