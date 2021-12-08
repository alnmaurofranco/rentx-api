import { IMailProvider } from '@infra/providers/MailProvider/IMailProvider';

class InMemoryMailProvider implements IMailProvider {
  constructor(public message: any[] = []) {}

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { InMemoryMailProvider };
