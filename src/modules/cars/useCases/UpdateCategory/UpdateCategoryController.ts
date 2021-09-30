import { Request, Response } from 'express';

import { UpdateCategory } from './UpdateCategory';

class UpdateCategoryController {
  constructor(private readonly updateCategory: UpdateCategory) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, description } = request.body;

      const category = await this.updateCategory.execute({
        id,
        name,
        description,
      });

      return response.json(category);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { UpdateCategoryController };
