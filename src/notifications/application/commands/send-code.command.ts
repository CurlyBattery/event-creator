import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { NotificationsService } from '@notifications/infra/ports/notifications.service';
import { Inject } from '@nestjs/common';

export class SendVerificationCodeEmail implements ICommand {
  constructor(
    public readonly email: string,
    public readonly verificationCode: number,
  ) {}
}

@CommandHandler(SendVerificationCodeEmail)
export class SendVerificationCodeEmailHandler
  implements ICommandHandler<SendVerificationCodeEmail>
{
  constructor(
    @Inject(NotificationsService)
    private readonly mailService: NotificationsService,
  ) {}

  async execute(command: SendVerificationCodeEmail): Promise<void> {
    const { email, verificationCode } = command;
    await this.mailService.sendMail({ to: email, verificationCode });
  }
}
