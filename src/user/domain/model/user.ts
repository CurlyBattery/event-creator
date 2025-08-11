export class UserWithoutPassword {
  id?: string;
  email: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
