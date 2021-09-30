import { Request, Response } from 'express';

import { DeleteCategory } from './DeleteCategory';

class DeleteCategoryController {
  constructor(private readonly deleteCategory: DeleteCategory) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      await this.deleteCategory.execute(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { DeleteCategoryController };
