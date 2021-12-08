import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository';

import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUser } from '../CreateUser/CreateUser';
import { AuthenticateUser } from './AuthenticateUser';

let usersRepository: InMemoryUsersRepository;
let usersTokensRepository: InMemoryUsersTokensRepository;
let dayJSDateProvider: DayJSDateProvider;
let authenticateUser: AuthenticateUser;
let createUser: CreateUser;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    usersTokensRepository = new InMemoryUsersTokensRepository();
    dayJSDateProvider = new DayJSDateProvider();
    createUser = new CreateUser(usersRepository);
    authenticateUser = new AuthenticateUser(
      usersRepository,
      usersTokensRepository,
      dayJSDateProvider
    );
  });

  it('Should be able to authenticate user with email and password', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: 'A, B E C',
    };

    await createUser.execute(user);

    const result = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUser.execute({
        email: 'johndoe-fake@example.com',
        password: '12345',
      });
    }).toBeTruthy();
  });

  it('Should not be able to authenticate with password invalid', async () => {
    expect(async () => {
      const user = {
        name: 'John Doe Test',
        email: 'johndoe-test@example.com',
        password: '1234567',
        driver_license: 'A, B E C',
      };

      await createUser.execute(user);

      await authenticateUser.execute({
        email: user.email,
        password: 'invalid-password',
      });
    }).toBeTruthy();
  });
});
