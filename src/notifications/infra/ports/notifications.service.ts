import { VerificationCodeEmailPayload } from '@notifications/domain/value-objects/verification-code.payload';

export abstract class NotificationsService {
  abstract sendMail(payload: VerificationCodeEmailPayload): Promise<void>;
}
