import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { configAuth } from '../config/auth';
import { AppError } from '../infra/errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
): Promise<void> => {
  const tokenHeader = request.headers.authorization;

  if (!tokenHeader) {
    throw new AppError('Token missing.', 401);
  }

  const [, token] = tokenHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, configAuth.secret) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists.', 401);
    }

    next();
  } catch (error) {
    throw new AppError('Invalid token.', 401);
  }
};

export { ensureAuthenticated };
