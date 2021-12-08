import { Repository, getRepository } from 'typeorm';

import { UserToken } from '@modules/accounts/domain/UserToken';
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: {
        user_id,
        refresh_token,
      },
    });

    return userToken;
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: {
        refresh_token,
      },
    });

    return userToken;
  }
}

export { UsersTokensRepository };
