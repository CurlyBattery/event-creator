import { RefreshTokenM } from '@auth/domain/model/refresh-token';
import { RefreshRepository } from '@auth/infra/ports/refresh.repository';
import { PrismaService } from '@common/database/infra/persistence/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RealRefreshRepository implements RefreshRepository {
  constructor(private readonly prisma: PrismaService) {}

  insert(refresh: RefreshTokenM): Promise<RefreshTokenM> {
    return this.prisma.refreshToken.create({
      data: {
        uuid: refresh.uuid,
        userId: refresh.userId,
        exp: refresh.exp,
      },
    });
  }

  getRefreshById(uuid: string): Promise<RefreshTokenM> {
    return this.prisma.refreshToken.findUnique({
      where: { uuid },
    });
  }

  async updateRefresh(
    refresh: Partial<RefreshTokenM> & { uuid: string },
  ): Promise<RefreshTokenM> {
    console.log(refresh.userId);
    const user = await this.prisma.refreshToken.findUnique({
      where: { userId: refresh.userId },
    });
    console.log(user);

    return this.prisma.refreshToken.upsert({
      where: { userId: refresh.userId },
      update: refresh,
      create: {
        uuid: refresh.uuid,
        exp: refresh.exp,
        userId: refresh.userId,
      },
    });
  }

  removeRefresh(uuid: string): Promise<RefreshTokenM> {
    return this.prisma.refreshToken.delete({
      where: { uuid },
    });
  }
}
