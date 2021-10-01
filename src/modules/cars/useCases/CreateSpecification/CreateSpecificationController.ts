import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecification } from './CreateSpecification';

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createSpecification = container.resolve(CreateSpecification);

      await createSpecification.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateSpecificationController };
