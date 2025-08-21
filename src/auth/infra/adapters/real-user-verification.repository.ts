import { Injectable } from '@nestjs/common';
import { UserVerificationRepository } from '@auth/infra/ports/user-verification.repository';
import { PrismaService } from '@common/database/infra/persistence/prisma.service';
import { UserVerificationM } from '@auth/domain/model/user-verification';

@Injectable()
export class RealUserVerificationRepository
  implements UserVerificationRepository
{
  constructor(private readonly prisma: PrismaService) {}

  upsertUserVerification({
    userId,
    code,
    expiresAt,
  }: UserVerificationM): Promise<UserVerificationM> {
    return this.prisma.userVerification.upsert({
      where: { userId },
      update: {
        code,
        expiresAt,
      },
      create: {
        userId,
        expiresAt,
        code,
      },
    });
  }

  getByUserId(userId: string): Promise<UserVerificationM> {
    throw new Error(`${userId} not implemented`);
  }
}
