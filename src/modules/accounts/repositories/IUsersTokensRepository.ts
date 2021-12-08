import { UserToken } from '../domain/UserToken';
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

interface IUsersTokensRepository {
  findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;
  create(dto: ICreateUserTokenDTO): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserToken>;
}

export { IUsersTokensRepository };
