import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
} from '@nestjs/common';

import { UserUseCasesProxyModule } from '@user/infra/usecases-proxy/user-usecases-proxy.module';
import { UseCaseProxy } from '@common/usecase-proxy/domain/use-case-proxy';
import { GetUserByIdUseCase } from '@user/application/use-cases/get-user-by-id.usecase';
import { UserPresenter } from '@user/infra/controllers/presenters/user.presenter';
import { UpdateUserDto } from '@user/infra/controllers/dto/user.dto';
import { GetUsersUseCase } from '@user/application/use-cases/get-users.usecase';
import { UpdateUserUseCase } from '@user/application/use-cases/update-user.usecase';
import { RemoveUserUseCase } from '@user/application/use-cases/remove-user.usecase';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserUseCasesProxyModule.GET_USER_BY_ID_USECASES_PROXY)
    private readonly getUserByIdUseCaseProxy: UseCaseProxy<GetUserByIdUseCase>,
    @Inject(UserUseCasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getUsersUseCaseProxy: UseCaseProxy<GetUsersUseCase>,
    @Inject(UserUseCasesProxyModule.PATCH_USER_USECASES_PROXY)
    private readonly updateUserUseCaseProxy: UseCaseProxy<UpdateUserUseCase>,
    @Inject(UserUseCasesProxyModule.DELETE_USER_USECASES_PROXY)
    private readonly deleteUserUseCaseProxy: UseCaseProxy<RemoveUserUseCase>,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.getUserByIdUseCaseProxy.getInstance().execute(id);
    return new UserPresenter(user);
  }

  // @Post()
  // async createUser(@Body() createUserDto: CreateUserDto) {
  //   const userCreated = await this.createUserUseCaseProxy
  //     .getInstance()
  //     .execute(createUserDto);
  //   return new UserPresenter(userCreated);
  // }

  @Get()
  async getUsers() {
    const users = await this.getUsersUseCaseProxy.getInstance().execute();
    return users.map((u) => new UserPresenter(u));
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userUpdated = await this.updateUserUseCaseProxy
      .getInstance()
      .execute(id, updateUserDto);

    return new UserPresenter(userUpdated);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const userDeleted = await this.deleteUserUseCaseProxy
      .getInstance()
      .execute(id);

    return new UserPresenter(userDeleted);
  }
}
