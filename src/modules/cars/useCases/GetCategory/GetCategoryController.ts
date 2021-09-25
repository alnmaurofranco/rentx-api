import { Response, Request } from 'express';

import { GetCategory } from './GetCategory';

class GetCategoryController {
  constructor(private readonly getCategory: GetCategory) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const category = await this.getCategory.execute(id);

    if (!category)
      return response.status(400).json({ error: 'Category not found.' });

    return response.json(category);
  }
}

export { GetCategoryController };
