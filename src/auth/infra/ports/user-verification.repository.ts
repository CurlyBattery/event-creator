import { UserVerificationM } from '@auth/domain/model/user-verification';

export abstract class UserVerificationRepository {
  abstract upsertUserVerification(
    userVerification: UserVerificationM,
  ): Promise<UserVerificationM>;
  abstract getByUserId(userId: string): Promise<UserVerificationM>;
}
