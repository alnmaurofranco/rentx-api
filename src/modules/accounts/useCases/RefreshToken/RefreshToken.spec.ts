import { AppError } from '@infra/http/errors/AppError';
import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { User } from '@modules/accounts/domain/User';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';
import { CreateUser } from '@modules/accounts/useCases/CreateUser/CreateUser';

import { AuthenticateUser } from '../AuthenticateUser/AuthenticateUser';
import { RefreshToken } from './RefreshToken';

let usersRepository: InMemoryUsersRepository;
let usersTokensRepository: InMemoryUsersTokensRepository;
let dayJSDateProvider: DayJSDateProvider;
let createUser: CreateUser;
let authenticateUser: AuthenticateUser;
let refreshToken: RefreshToken;
let user: Pick<User, 'name' | 'email' | 'driver_license' | 'password'>;

describe('Refresh Token', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    usersTokensRepository = new InMemoryUsersTokensRepository();
    dayJSDateProvider = new DayJSDateProvider();
    createUser = new CreateUser(usersRepository);
    authenticateUser = new AuthenticateUser(
      usersRepository,
      usersTokensRepository,
      dayJSDateProvider
    );
    refreshToken = new RefreshToken(usersTokensRepository, dayJSDateProvider);

    user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: 'A',
      password: '123456',
    };

    await createUser.execute(user);
  });

  it('Should be able to create a new refresh token', async () => {
    const authenticate = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    const { refresh_token } = authenticate;

    const result = await refreshToken.execute(refresh_token);

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('refresh_token');
  });

  it('Should not be able to create a new refresh token with refresh token does not exists', async () => {
    expect(async () => {
      const authenticate = await authenticateUser.execute({
        email: user.email,
        password: user.password,
      });

      const {
        user: { id },
        refresh_token,
      } = authenticate;

      await usersTokensRepository.deleteById(id);

      await refreshToken.execute(refresh_token);
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      const authenticate = await authenticateUser.execute({
        email: user.email,
        password: user.password,
      });

      const {
        user: { id },
        refresh_token,
      } = authenticate;

      await usersTokensRepository.deleteById(id);

      await refreshToken.execute(refresh_token);
    }).rejects.toEqual(
      expect.objectContaining({
        message: 'Refresh Token does not exists',
        statusCode: 500,
      })
    );
  });

  it('Should not be able to create a new refresh token with token does not formatted', async () => {
    expect(async () => {
      await refreshToken.execute('invalid-token');
    }).toBeTruthy();
    expect(async () => {
      await refreshToken.execute('invalid-token');
    }).rejects.toThrowError('jwt malformed');
  });
});
