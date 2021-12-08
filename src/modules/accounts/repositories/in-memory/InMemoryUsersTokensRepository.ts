import { UserToken } from '@modules/accounts/domain/UserToken';
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class InMemoryUsersTokensRepository implements IUsersTokensRepository {
  constructor(public userTokens: UserToken[] = []) {}

  public async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.userTokens.find(
      (findUserToken) => findUserToken.refresh_token === refresh_token
    );
  }

  public async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.findIndex(
      (findUserToken) => findUserToken.id === id
    );

    this.userTokens.splice(userToken, 1);
  }

  public async findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.userTokens.find(
      (findUserToken) =>
        findUserToken.user_id === user_id &&
        findUserToken.refresh_token === refresh_token
    );
  }

  public async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export { InMemoryUsersTokensRepository };
