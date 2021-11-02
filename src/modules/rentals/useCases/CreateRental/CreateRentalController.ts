import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRental } from './CreateRental';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;
      const { car_id, expected_return_date } = request.body;

      const createRental = container.resolve(CreateRental);

      const result = await createRental.execute({
        user_id,
        car_id,
        expected_return_date,
      });

      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateRentalController };
