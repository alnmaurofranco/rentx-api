import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllCategory } from './GetAllCategory';

class GetAllCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const getAllCategory = container.resolve(GetAllCategory);

      const categories = await getAllCategory.execute();

      return response.json(categories);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { GetAllCategoryController };
