import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/EnsureAdmin';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();

const carsRouter = Router();

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get('/available', listAvailableCars.handle);

export { carsRouter };
