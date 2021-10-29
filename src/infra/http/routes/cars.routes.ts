import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/EnsureAdmin';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificationController();

const carsRouter = Router();

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get('/available', listAvailableCars.handle);

carsRouter.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecification.handle
);

export { carsRouter };
