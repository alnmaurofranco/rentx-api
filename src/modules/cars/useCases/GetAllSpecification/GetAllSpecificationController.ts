import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllSpecification } from './GetAllSpecification';

class GetAllSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const getAllSpecification = container.resolve(GetAllSpecification);
      const result = await getAllSpecification.execute();

      return response.json(result);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { GetAllSpecificationController };
