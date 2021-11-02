import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/CreateRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/DevolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

const rentalsRouter = Router();

rentalsRouter.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRouter.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalsRouter.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRouter };
