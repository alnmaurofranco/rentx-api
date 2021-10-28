import { NextFunction, Request, Response } from 'express';

import { AppError } from '@infra/http/errors/AppError';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';

const ensureAdmin = async (
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<unknown> => {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin.", 403);
  }

  return next();
};

export { ensureAdmin };
