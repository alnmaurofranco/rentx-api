import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategory } from './ImportCategory';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      const importCategory = container.resolve(ImportCategory);

      await importCategory.execute({ file });

      return response.send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ImportCategoryController };
