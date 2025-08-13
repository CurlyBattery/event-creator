// чтение команды на создание пользователя
// создание пользователя
// отправление евента UserCreated, если пользователь создан, чтобы отправить на почту уведомелние с кодом(пока не нужно)
// возвращение пользователя
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateUserCommand } from '../../../auth/application/commands/sign-up.command';
import { UserM } from '@user/domain/model/user';
import { UserUseCasesProxyModule } from '@user/infra/usecases-proxy/user-usecases-proxy.module';
import { UseCaseProxy } from '@common/usecase-proxy/domain/use-case-proxy';
import { CreateUserUseCase } from '@user/application/use-cases/create-user.usecase';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserUseCasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly createUserUseCaseProxy: UseCaseProxy<CreateUserUseCase>,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserM> {
    const { email, refreshToken, password } = command;
    const user = await this.createUserUseCaseProxy
      .getInstance()
      .execute({ email, refreshToken, password });
    // отправление евента
    return user;
  }
}
