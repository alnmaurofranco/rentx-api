import { Request, Response, NextFunction } from 'express';

import { AppError } from '@infra/http/errors/AppError';

export default function EnsureError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  next();
}
