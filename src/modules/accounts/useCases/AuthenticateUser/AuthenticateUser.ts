import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { configAuth } from '@config/auth';
import { AppError } from '@infra/http/errors/AppError';
import { IAuthenticateUserDTO } from '@modules/accounts/dtos';
import { AccountsMapper } from '@modules/accounts/mappers/AccountsMapper';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

type AuthenticateUserRequest = {
  email: string;
  password: string;
};

type AuthenticateUserResponse = IAuthenticateUserDTO;

@injectable()
class AuthenticateUser {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail or password invalid.', 400);
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      throw new AppError('E-mail or password invalid.', 400);
    }

    const token = sign({}, configAuth.secret, {
      subject: user.id,
      expiresIn: '1d',
    });

    return AccountsMapper.toDto(user, token);
  }
}

export { AuthenticateUser };
