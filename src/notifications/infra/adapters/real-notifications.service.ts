import { Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';

import { NotificationsService } from '@notifications/infra/ports/notifications.service';
import { VerificationCodeEmailPayload } from '@notifications/domain/value-objects/verification-code.payload';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class RealNotificationsService implements NotificationsService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: configService.get<string>('EMAIL_SERVICE'),
      auth: {
        user: configService.get<string>('EMAIL_USER'),
        pass: configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(payload: VerificationCodeEmailPayload): Promise<void> {
    console.log(payload);
    await this.nodemailerTransport.sendMail({
      to: payload.to,
      text: `Пиdор: ${payload.verificationCode}}`,
    });
  }
}
