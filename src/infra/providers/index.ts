import { container } from 'tsyringe';

import { IDateProvider } from '@infra/providers/DateProvider/IDateProvider';
import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';

import { IMailProvider } from './MailProvider/IMailProvider';
import { MailTrapProvider } from './MailProvider/implementations/MailTrapProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayJSDateProvider',
  DayJSDateProvider
);

container.registerInstance<IMailProvider>(
  'MailTrapProvider',
  new MailTrapProvider()
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider
);
