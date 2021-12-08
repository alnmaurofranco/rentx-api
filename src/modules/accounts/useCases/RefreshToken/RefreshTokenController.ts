import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshToken } from './RefreshToken';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const token =
        request.body.token ||
        request.headers['x-access-token'] ||
        request.query.token;

      const refreshToken = container.resolve(RefreshToken);
      const result = await refreshToken.execute(token);

      return response.json(result);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { RefreshTokenController };
