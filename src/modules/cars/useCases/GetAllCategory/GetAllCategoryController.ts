import { Request, Response } from 'express';

import { GetAllCategory } from './GetAllCategory';

class GetAllCategoryController {
  constructor(private readonly getAllCategory: GetAllCategory) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const categories = await this.getAllCategory.execute();

      return response.json(categories);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { GetAllCategoryController };
