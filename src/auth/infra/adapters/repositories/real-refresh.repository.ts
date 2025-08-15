import { RefreshTokenM } from '@auth/domain/model/refresh-token';
import { RefreshRepository } from '@auth/infra/ports/refresh.repository';
import { PrismaService } from '@common/database/infra/persistence/prisma.service';

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

  updateRefresh(
    uuid: string,
    refresh: Partial<RefreshTokenM>,
  ): Promise<RefreshTokenM> {
    return this.prisma.refreshToken.update({
      where: { uuid },
      data: {
        uuid: refresh.uuid,
      },
    });
  }

  removeRefresh(uuid: string): Promise<RefreshTokenM> {
    return this.prisma.refreshToken.delete({
      where: { uuid },
    });
  }
}
