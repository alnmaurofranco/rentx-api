import { AppError } from '@infra/http/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';

import { CreateUser } from './CreateUser';

let usersRepository: InMemoryUsersRepository;
let createUser: CreateUser;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
  });

  it('Should be able to create a user', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '00987654321',
    };

    await createUser.execute(user);

    const userExists = await usersRepository.findByEmail(user.email);

    expect(userExists).toHaveProperty('id');
    expect(usersRepository.users.length).toBe(1);
  });

  it('Should not be able to create a user with user exists', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'John Test',
        email: 'johntest@example.com',
        password: '1234',
        driver_license: '009876',
      };

      await createUser.execute(user);
      await createUser.execute(user);
    }).toBeTruthy();

    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'John Test',
        email: 'johntest@example.com',
        password: '1234',
        driver_license: '009876',
      };

      await createUser.execute(user);
      await createUser.execute(user);
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'John Test',
        email: 'johntest@example.com',
        password: '1234',
        driver_license: '009876',
      };

      await createUser.execute(user);
      await createUser.execute(user);
    }).rejects.toMatchObject({ message: 'User already exists.' });
  });
});
