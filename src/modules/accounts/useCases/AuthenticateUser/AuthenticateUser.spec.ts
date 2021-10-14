import { AppError } from '../../../../infra/errors/AppError';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUser } from '../CreateUser/CreateUser';
import { AuthenticateUser } from './AuthenticateUser';

let usersRepository: IUsersRepository;
let authenticateUser: AuthenticateUser;
let createUser: CreateUser;

describe('Authenticate User value object', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
    authenticateUser = new AuthenticateUser(usersRepository);
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
    }).rejects.toBeInstanceOf(AppError);
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
    }).rejects.toBeInstanceOf(AppError);
  });
});
