import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecification } from './CreateCarSpecification';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { specifications_id } = request.body;

      const createCarSpecification = container.resolve(CreateCarSpecification);
      const result = await createCarSpecification.execute({
        car_id: id,
        specifications_id,
      });

      return response.json(result);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }
}

export { CreateCarSpecificationController };
