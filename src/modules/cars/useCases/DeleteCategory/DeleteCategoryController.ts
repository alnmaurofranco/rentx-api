import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCategory } from './DeleteCategory';

class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteCategory = container.resolve(DeleteCategory);

      await deleteCategory.execute(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { DeleteCategoryController };
