import { Request, Response } from 'express';

import { UpdateCategory } from './UpdateCategory';

class UpdateCategoryController {
  constructor(private readonly updateCategory: UpdateCategory) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const category = await this.updateCategory.execute({
      id,
      name,
      description,
    });

    return response.json(category);
  }
}

export { UpdateCategoryController };
