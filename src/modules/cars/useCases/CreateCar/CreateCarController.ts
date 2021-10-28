import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCar } from './CreateCar';

type CreateCarControllerRequest = {
  name: string;
  description: string;
  brand: string;
  daily_rate: number;
  fine_amount: number;
  license_plate: string;
  category_id: string;
};

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        description,
        brand,
        daily_rate,
        fine_amount,
        license_plate,
        category_id,
      } = request.body as CreateCarControllerRequest;

      const createCar = container.resolve(CreateCar);

      await createCar.execute({
        name,
        description,
        brand,
        daily_rate,
        fine_amount,
        license_plate,
        category_id,
      });

      return response.status(201).json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateCarController };
