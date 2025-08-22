import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserUseCasesProxyModule } from '@user/infra/usecases-proxy/user-usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { UseCaseProxy } from '@common/usecase-proxy/domain/use-case-proxy';
import { UpdateUserUseCase } from '@user/application/use-cases/update-user.usecase';
import { UserM } from '@user/domain/model/user';

export class UpdateUserCommand {
  constructor(
    public readonly isVerified: boolean,
    public readonly userId: string,
  ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(UserUseCasesProxyModule.PATCH_USER_USECASES_PROXY)
    private readonly updateUserUseCaseProxy: UseCaseProxy<UpdateUserUseCase>,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserM> {
    const { userId, isVerified } = command;

    const user = await this.updateUserUseCaseProxy
      .getInstance()
      .execute(userId, {
        isVerified,
      });

    return user;
  }
}
