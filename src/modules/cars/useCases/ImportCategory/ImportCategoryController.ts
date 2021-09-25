import { Request, Response } from 'express';

import { ImportCategory } from './ImportCategory';

class ImportCategoryController {
  constructor(private importCategory: ImportCategory) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.importCategory.execute({ file });

    return response.send();
  }
}

export { ImportCategoryController };
