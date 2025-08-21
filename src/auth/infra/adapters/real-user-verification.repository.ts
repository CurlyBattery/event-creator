import { Injectable } from '@nestjs/common';
import { UserVerificationRepository } from '@auth/infra/ports/user-verification.repository';
import { PrismaService } from '@common/database/infra/persistence/prisma.service';
import { UserVerificationM } from '@auth/domain/model/user-verification';

@Injectable()
export class RealUserVerificationRepository
  implements UserVerificationRepository
{
  constructor(private readonly prisma: PrismaService) {}

  upsertUserVerification(
    userVerification: UserVerificationM,
  ): Promise<UserVerificationM> {
    throw new Error(`${userVerification} not implemented and ${this.prisma}`);
  }

  getByUserId(userId: string): Promise<UserVerificationM> {
    throw new Error(`${userId} not implemented`);
  }
}
