import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { configAuth } from '@config/auth';
import { AppError } from '@infra/http/errors/AppError';

interface IPayload {
  sub: string;
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
): Promise<void> => {
  const { secret_token } = configAuth;
  const tokenHeader = request.headers.authorization;

  if (!tokenHeader) {
    throw new AppError('Token missing.', 401);
  }

  const [, token] = tokenHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token.', 401);
  }
};

export { ensureAuthenticated };
