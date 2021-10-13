import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUser } from './CreateUser';

type CreateUserControllerRequest = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
};

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, driver_license } =
        request.body as CreateUserControllerRequest;

      const createUser = container.resolve(CreateUser);

      await createUser.execute({
        name,
        email,
        password,
        driver_license,
      });

      return response.status(201).json();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };
