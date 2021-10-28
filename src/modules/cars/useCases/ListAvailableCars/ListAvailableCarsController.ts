import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCars } from './ListAvailableCars';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { brand, name, category_id } = request.query;

      const listAvailableCars = container.resolve(ListAvailableCars);
      const result = await listAvailableCars.execute({
        brand: brand as string,
        name: name as string,
        category_id: category_id as string,
      });

      return response.json(result);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ListAvailableCarsController };
