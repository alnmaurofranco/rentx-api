import { Request, Response } from 'express';

import { ImportCategory } from './ImportCategory';

class ImportCategoryController {
  constructor(private importCategory: ImportCategory) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      await this.importCategory.execute({ file });

      return response.send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ImportCategoryController };
