import { v4 as uuid } from 'uuid';

import { AppError } from '@infra/http/errors/AppError';
import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { User } from '@modules/accounts/domain/User';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';
import { CreateUser } from '@modules/accounts/useCases/CreateUser/CreateUser';

import { AuthenticateUser } from '../AuthenticateUser/AuthenticateUser';
import { ResetPasswordUser } from './ResetPasswordUser';

let usersRepository: InMemoryUsersRepository;
let usersTokensRepository: InMemoryUsersTokensRepository;
let dayJSDateProvider: DayJSDateProvider;
let createUser: CreateUser;
let authenticateUser: AuthenticateUser;
let resetPasswordUser: ResetPasswordUser;
let user: Pick<User, 'name' | 'email' | 'password' | 'driver_license'>;

describe('Reset Password User Use Case', () => {
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
    resetPasswordUser = new ResetPasswordUser(
      usersRepository,
      usersTokensRepository,
      dayJSDateProvider
    );

    user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: 'A',
      password: '123456',
    };

    await createUser.execute(user);
  });

  it('Should be able to reset a password user', async () => {
    const { id: userId } = await usersRepository.findByEmail(user.email);

    const generateToken = uuid();
    const expires_date = dayJSDateProvider.addHours(3);

    const { refresh_token: token } = await usersTokensRepository.create({
      user_id: userId,
      refresh_token: generateToken,
      expires_date,
    });

    const newPassword = '123456789';

    await resetPasswordUser.execute({
      token,
      password: newPassword,
    });

    const result = await authenticateUser.execute({
      email: user.email,
      password: newPassword,
    });

    expect(result).toHaveProperty('token');
    expect(result.user).toHaveProperty('id');
  });

  it('Should not be able to reset a password user with invalid token', async () => {
    const newPassword = '123456789';

    await expect(
      resetPasswordUser.execute({
        token: 'invalid-token',
        password: newPassword,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
