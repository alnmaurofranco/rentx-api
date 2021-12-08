import { AppError } from '@infra/http/errors/AppError';
import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { InMemoryMailProvider } from '@infra/providers/MailProvider/in-memory/InMemoryMailProvider';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';

import { SendForgotPasswordMail } from './SendForgotPasswordMail';

let usersRepository: InMemoryUsersRepository;
let usersTokensRepository: InMemoryUsersTokensRepository;
let dayJSDateProvider: DayJSDateProvider;
let mailProvider: InMemoryMailProvider;
let sendForgotPasswordMail: SendForgotPasswordMail;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    usersTokensRepository = new InMemoryUsersTokensRepository();
    dayJSDateProvider = new DayJSDateProvider();
    mailProvider = new InMemoryMailProvider();

    sendForgotPasswordMail = new SendForgotPasswordMail(
      usersRepository,
      usersTokensRepository,
      dayJSDateProvider,
      mailProvider
    );
  });

  it('Should be able to send forgot a password mail', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepository.create({
      driver_license: '928357',
      email: 'sovuj@kuota.ac',
      name: 'Rhoda Gordon',
      password: '123456',
    });

    await sendForgotPasswordMail.execute('sovuj@kuota.ac');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMail.execute('non-existent-user')
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  it('Should be able to create an users tokens', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepository, 'create');

    await usersRepository.create({
      driver_license: '570285',
      email: 'cuvu@ojaom.pm',
      name: 'Brett Barnett',
      password: '123456',
    });

    await sendForgotPasswordMail.execute('cuvu@ojaom.pm');

    expect(generateTokenMail).toBeCalled();
  });
});
