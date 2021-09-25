import { Request, Response } from 'express';

import { CreateCategory } from './CreateCategory';

type CreateCategoryControllerRequest = {
  name: string;
  description: string;
};

class CreateCategoryController {
  constructor(private readonly createCategory: CreateCategory) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } =
      request.body as CreateCategoryControllerRequest;

    await this.createCategory.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
