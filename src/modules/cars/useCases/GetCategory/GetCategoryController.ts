import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { GetCategory } from './GetCategory';

class GetCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const getCategory = container.resolve(GetCategory);

      const category = await getCategory.execute(id);

      if (!category)
        return response.status(400).json({ error: 'Category not found.' });

      return response.json(category);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { GetCategoryController };
