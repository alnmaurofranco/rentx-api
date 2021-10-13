import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUser } from './AuthenticateUser';

type AuthenticateUserControllerRequest = {
  email: string;
  password: string;
};

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } =
        request.body as AuthenticateUserControllerRequest;

      const authenticateUser = container.resolve(AuthenticateUser);
      const result = await authenticateUser.execute({ email, password });

      return response.json(result);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { AuthenticateUserController };
