import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUser } from './ResetPasswordUser';

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.query;

      const { password } = request.body;

      const resetPasswordUser = container.resolve(ResetPasswordUser);

      await resetPasswordUser.execute({
        token: String(token),
        password,
      });

      return response.json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ResetPasswordUserController };
