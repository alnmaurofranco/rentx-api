import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { configAuth } from '@config/auth';
import { AppError } from '@infra/http/errors/AppError';
import { IDateProvider } from '@infra/providers/DateProvider/IDateProvider';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

type TokenPayload = {
  sub: string;
  email: string;
};

type RefreshTokenResponse = {
  refresh_token: string;
  token: string;
};

@injectable()
class RefreshToken {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJSDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<RefreshTokenResponse> {
    const {
      secret_token,
      secret_refresh_token,
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = configAuth;

    const { email, sub } = verify(token, secret_refresh_token) as TokenPayload;

    const user_id = sub;

    const userTokens =
      await this.usersTokensRepository.findByUserAndRefreshToken(
        user_id,
        token
      );

    if (!userTokens) {
      throw new AppError('Refresh Token does not exists');
    }

    await this.usersTokensRepository.deleteById(userTokens.id);

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export { RefreshToken };
