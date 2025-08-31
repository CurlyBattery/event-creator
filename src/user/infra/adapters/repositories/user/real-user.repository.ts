import { Injectable } from '@nestjs/common';
import { UserM } from '@user/domain/model/user';
import { PrismaService } from '@common/database/infra/persistence/prisma.service';
import { UserRepository } from '@user/infra/ports/user.repository';

@Injectable()
export class RealUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  insert(user: UserM): Promise<UserM> {
    return this.prisma.user.create({
      data: user,
    });
  }

  getUserByEmail(email: string): Promise<UserM> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  getUserById(id: string): Promise<UserM> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  getUsers(): Promise<UserM[]> {
    return this.prisma.user.findMany();
  }

  updateUser(
    id: string,
    user: Partial<Omit<UserM, 'password'>>,
  ): Promise<UserM> {
    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  removeUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
