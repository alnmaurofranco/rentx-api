import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/CreateSpecification/CreateSpecificationController';
import { GetAllSpecificationController } from '@modules/cars/useCases/GetAllSpecification/GetAllSpecificationController';

import { ensureAdmin } from '../middlewares/EnsureAdmin';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const createSpecificationController = new CreateSpecificationController();
const getAllSpecificationController = new GetAllSpecificationController();

const specificationsRouter = Router();

specificationsRouter.get('/', getAllSpecificationController.handle);

specificationsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRouter };
