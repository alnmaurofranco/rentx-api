import { container } from 'tsyringe';

import { IDateProvider } from '@infra/providers/DateProvider/IDateProvider';
import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';

import { IMailProvider } from './MailProvider/IMailProvider';
import { MailTrapProvider } from './MailProvider/implementations/MailTrapProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayJSDateProvider',
  DayJSDateProvider
);

container.registerInstance<IMailProvider>(
  'MailTrapProvider',
  new MailTrapProvider()
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK]
);
