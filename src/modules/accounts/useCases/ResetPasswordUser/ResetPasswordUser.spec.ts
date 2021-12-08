import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';

import { ResetPasswordUser } from './ResetPasswordUser';

let usersRepository: InMemoryUsersRepository;
let usersTokensRepository: InMemoryUsersTokensRepository;
let dayJSDateProvider: DayJSDateProvider;
let resetPasswordUser: ResetPasswordUser;

describe('ResetPasswordUser', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    usersTokensRepository = new InMemoryUsersTokensRepository();
    dayJSDateProvider = new DayJSDateProvider();
    resetPasswordUser = new ResetPasswordUser(
      usersRepository,
      usersTokensRepository,
      dayJSDateProvider
    );
  });

  it('Should be able to reset a password user', async () => {
    await resetPasswordUser.execute({ token: '122335', password: '123' });
  });
});
