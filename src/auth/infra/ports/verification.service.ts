export abstract class VerificationService {
  abstract generateCode(userId: string): Promise<void>;
  abstract verifyCode(userId: string, code: number): Promise<void>;
}
