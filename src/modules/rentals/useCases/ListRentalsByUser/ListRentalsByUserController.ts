import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUser } from './ListRentalsByUser';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;

      const listRentalsByUser = container.resolve(ListRentalsByUser);
      const result = await listRentalsByUser.execute(user_id);

      return response.json(result);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ListRentalsByUserController };
