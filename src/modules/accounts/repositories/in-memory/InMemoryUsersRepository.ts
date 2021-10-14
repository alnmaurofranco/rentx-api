import { User } from '@modules/accounts/domain/User';
import { ICreateUserDTO } from '@modules/accounts/dtos';

import { IUsersRepository } from '../IUsersRepository';

class InMemoryUsersRepository implements IUsersRepository {
  constructor(public users: User[] = []) {}

  async findById(user_id: string): Promise<User> {
    return this.users.find((findUser) => findUser.id === user_id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((findUser) => findUser.email === email);
  }

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[userIndex] = user;
  }
}

export { InMemoryUsersRepository };
