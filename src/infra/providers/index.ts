import { container } from 'tsyringe';

import { IDateProvider } from '@infra/providers/DateProvider/IDateProvider';
import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';

container.registerSingleton<IDateProvider>(
  'DayJSDateProvider',
  DayJSDateProvider
);
