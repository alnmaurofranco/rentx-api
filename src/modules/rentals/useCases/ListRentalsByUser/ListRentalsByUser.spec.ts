import { ICreateUserDTO } from '@modules/accounts/dtos';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';

import { ListRentalsByUser } from './ListRentalsByUser';

let usersRepository: InMemoryUsersRepository;
let rentalsRepository: InMemoryRentalsRepository;
let listRentalsByUser: ListRentalsByUser;

describe('List Rentals By User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    rentalsRepository = new InMemoryRentalsRepository();
    listRentalsByUser = new ListRentalsByUser(rentalsRepository);
  });

  it('Should be able to list rentals by user', async () => {
    const createUser: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '00987654321',
    };

    await usersRepository.create(createUser);

    const user = await usersRepository.findByEmail(createUser.email);

    // create rental

    await listRentalsByUser.execute(user.id);
  });

  it('Should not be able to list rentals by user with user does not exists', async () => {
    expect(async () => {
      await listRentalsByUser.execute('non-existent-user');
    }).toBeTruthy();
  });
});
