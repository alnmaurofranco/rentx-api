import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategory } from './CreateCategory';

type CreateCategoryControllerRequest = {
  name: string;
  description: string;
};

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } =
        request.body as CreateCategoryControllerRequest;

      const createCategory = container.resolve(CreateCategory);

      await createCategory.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateCategoryController };
