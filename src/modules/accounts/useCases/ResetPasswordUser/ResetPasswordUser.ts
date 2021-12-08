import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { IDateProvider } from '@infra/providers/DateProvider/IDateProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

type ResetPasswordUserRequest = {
  token: string;
  password: string;
};

type ResetPasswordUserResponse = void;

@injectable()
class ResetPasswordUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJSDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    token,
    password,
  }: ResetPasswordUserRequest): Promise<ResetPasswordUserResponse> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError('Token invalid.');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 12);

    await this.usersRepository.save(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUser };
