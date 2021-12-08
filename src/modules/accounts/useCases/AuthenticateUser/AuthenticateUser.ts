import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { configAuth } from '@config/auth';
import { AppError } from '@infra/http/errors/AppError';
import { IDateProvider } from '@infra/providers/DateProvider/IDateProvider';
import { IAuthenticateUserDTO } from '@modules/accounts/dtos';
import { AccountsMapper } from '@modules/accounts/mappers/AccountsMapper';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

type AuthenticateUserRequest = {
  email: string;
  password: string;
};

type AuthenticateUserResponse = IAuthenticateUserDTO;

@injectable()
class AuthenticateUser {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayJSDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const {
      secret_token,
      secret_refresh_token,
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = configAuth;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail or password invalid.', 400);
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      throw new AppError('E-mail or password invalid.', 400);
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return AccountsMapper.toDto(user, token, refresh_token);
  }
}

export { AuthenticateUser };
