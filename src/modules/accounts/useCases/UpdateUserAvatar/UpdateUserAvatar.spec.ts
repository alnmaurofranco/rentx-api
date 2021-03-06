import { AppError } from '@infra/http/errors/AppError';
import { LocalStorageProvider } from '@infra/providers/StorageProvider/implementations/LocalStorageProvider';
import { ICreateUserDTO } from '@modules/accounts/dtos';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';

import { CreateUser } from '../CreateUser/CreateUser';
import { UpdateUserAvatar } from './UpdateUserAvatar';

let usersRepository: InMemoryUsersRepository;
let localStorageProvider: LocalStorageProvider;
let createUser: CreateUser;
let updateUserAvatar: UpdateUserAvatar;
let user: ICreateUserDTO;

describe('Update User Avatar', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    localStorageProvider = new LocalStorageProvider();
    createUser = new CreateUser(usersRepository);
    updateUserAvatar = new UpdateUserAvatar(
      usersRepository,
      localStorageProvider
    );

    user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '12321321',
    };
  });

  it('Should be able to update user adding avatar', async () => {
    expect(async () => {
      await createUser.execute(user);

      const { id: user_id } = await usersRepository.findByEmail(user.email);

      await updateUserAvatar.execute({
        user_id,
        avatar_file: 'fake.jpg',
      });
    }).toBeTruthy();
  });

  it('Should not be able to update nonexisting user', async () => {
    expect(async () => {
      await updateUserAvatar.execute({
        user_id: 'fake-user-id',
        avatar_file: 'fake.jpg',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
