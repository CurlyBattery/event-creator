// создаем команду на создание пользователя с email и password
export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly refreshToken: string,
    public readonly password: string,
  ) {}
}
