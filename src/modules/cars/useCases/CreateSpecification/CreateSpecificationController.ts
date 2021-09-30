import { Request, Response } from 'express';

import { CreateSpecification } from './CreateSpecification';

class CreateSpecificationController {
  constructor(private readonly createSpecification: CreateSpecification) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      await this.createSpecification.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateSpecificationController };
