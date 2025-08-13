export class UserWithoutPassword {
  id?: string;
  email: string;
  refreshToken: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
