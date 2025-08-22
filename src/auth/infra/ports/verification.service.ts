import { AccessTokenPayload } from '@auth/infra/types/access-token.payload';

export abstract class VerificationService {
  abstract generateCode(user: AccessTokenPayload): Promise<void>;
  abstract verifyCode(userId: string, code: number): Promise<void>;
}
