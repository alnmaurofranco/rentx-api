import { Router } from 'express';

import { CreateSpecificationFactory } from '../factories/CreateSpecificationFactory';

const specificationsRouter = Router();

specificationsRouter.post('/', async (request, response) => {
  return CreateSpecificationFactory().handle(request, response);
});

export { specificationsRouter };
