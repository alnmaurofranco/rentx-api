import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCategory } from './UpdateCategory';

class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, description } = request.body;

      const updateCategory = container.resolve(UpdateCategory);

      const category = await updateCategory.execute({
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
