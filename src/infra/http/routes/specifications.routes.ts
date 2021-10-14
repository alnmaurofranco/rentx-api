import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/CreateSpecification/CreateSpecificationController';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouter.post('/', createSpecificationController.handle);

export { specificationsRouter };
