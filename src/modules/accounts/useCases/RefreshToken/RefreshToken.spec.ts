import { sign } from 'jsonwebtoken';

import { configAuth } from '@config/auth';
import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';

import { RefreshToken } from './RefreshToken';

let usersTokensRepository: InMemoryUsersTokensRepository;
let dayJSDateProvider: DayJSDateProvider;
let refreshToken: RefreshToken;

describe('Refresh Token', () => {
  beforeEach(() => {
    usersTokensRepository = new InMemoryUsersTokensRepository();
    dayJSDateProvider = new DayJSDateProvider();
    refreshToken = new RefreshToken(usersTokensRepository, dayJSDateProvider);
  });

  it('Should be able to create a new refresh token', async () => {
    const token = sign({}, configAuth.secret_token, {
      subject: '123456',
    });

    await refreshToken.execute(token);
  });

  it('Should not be able to create a new refresh token with token does not formatted', async () => {
    await expect(refreshToken.execute('invalid-token')).toBeTruthy();
  });
});
