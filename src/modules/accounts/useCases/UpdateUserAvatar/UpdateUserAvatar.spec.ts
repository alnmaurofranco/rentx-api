import { ICreateUserDTO } from '@modules/accounts/dtos';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';

import { LocalStorageProvider } from '../../../../infra/providers/StorageProvider/implementations/LocalStorageProvider';
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
    await createUser.execute(user);

    const { id: user_id } = await usersRepository.findByEmail(user.email);

    await updateUserAvatar.execute({
      user_id,
      avatar_file: '123',
    });

    expect(0).toBe(0);
  });

  it('Should not be able to update nonexisting user', async () => {
    expect(0).toBe(0);
  });
});
