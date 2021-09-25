import { Request, Response } from 'express';

import { CreateSpecification } from './CreateSpecification';

class CreateSpecificationController {
  constructor(private readonly createSpecification: CreateSpecification) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    await this.createSpecification.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
