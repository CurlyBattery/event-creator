import { UserM } from '@user/domain/model/user';

export class UserPresenter {
  id: string;
  email: string;

  constructor(user: UserM) {
    this.id = user.id;
    this.email = user.email;
  }
}
