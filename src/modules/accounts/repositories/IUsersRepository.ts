import { User } from '../domain/User';
import { ICreateUserDTO } from '../dtos';

interface IUsersRepository {
  findById(user_id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(dto: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
