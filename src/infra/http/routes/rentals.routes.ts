import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/CreateRental/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const createRentalController = new CreateRentalController();

const rentalsRouter = Router();

rentalsRouter.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalsRouter };
