import { Repository, getRepository } from 'typeorm';

import { User } from '@modules/accounts/domain/User';
import { ICreateUserDTO } from '@modules/accounts/dtos';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(user_id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id: user_id } });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }

  async save(user: User): Promise<void> {
    // const userFinded = await this.repository.findOne({
    //   where: {
    //     id: user.id,
    //   },
    // });

    // await this.repository.update(user, userFinded);
    // eslint-disable-next-line no-param-reassign
    user.updated_at = new Date();

    await this.repository.save(user);
  }
}

export { UsersRepository };
