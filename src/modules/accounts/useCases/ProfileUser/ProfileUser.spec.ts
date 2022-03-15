import { AppError } from '@infra/http/errors/AppError';
import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { User } from '@modules/accounts/domain/User';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';

import { AuthenticateUser } from '../AuthenticateUser/AuthenticateUser';
import { CreateUser } from '../CreateUser/CreateUser';
import { ProfileUser } from './ProfileUser';

let usersRepository: InMemoryUsersRepository;
let usersTokensRepository: InMemoryUsersTokensRepository;
let dayJSDateProvider: DayJSDateProvider;
let createUser: CreateUser;
let authenticateUser: AuthenticateUser;
let profileUser: ProfileUser;
let user: Pick<User, 'name' | 'email' | 'driver_license' | 'password'>;

describe('Profile user use case', () => {
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
    profileUser = new ProfileUser(usersRepository);

    user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      driver_license: 'A',
      password: '123456',
    };

    await createUser.execute(user);
  });

  it('Should be able to get user profile', async () => {
    const { user: userAuth } = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    const result = await profileUser.execute({ userId: userAuth.id });

    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
    expect(result).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
        driver_license: user.driver_license,
        avatar_url: expect.any(String),
      })
    );
  });

  it('Should not be able to get user profile with user does not exists', async () => {
    expect(async () => {
      await profileUser.execute({ userId: 'invalid-user-id' });
    }).rejects.toBeInstanceOf(AppError);
  });
});
