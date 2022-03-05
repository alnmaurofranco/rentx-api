import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { MailTrapProvider } from './implementations/MailTrapProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const defineMailProvider = process.env.MAIL_PROVIDER;

const mailProvider = {
  mailtrap: MailTrapProvider,
  ses: SESMailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProvider[defineMailProvider]
);
