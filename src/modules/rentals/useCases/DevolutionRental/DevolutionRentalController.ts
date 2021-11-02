import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRental } from './DevolutionRental';

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;
      const { id } = request.params;

      const devolutionRental = container.resolve(DevolutionRental);

      const result = await devolutionRental.execute({
        user_id,
        id,
      });

      return response.json(result);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { DevolutionRentalController };
