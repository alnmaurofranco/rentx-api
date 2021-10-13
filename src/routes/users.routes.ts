import { Router } from 'express';

import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController';

const createUserController = new CreateUserController();

const accountsRouter = Router();

accountsRouter.post('/', createUserController.handle);

export { accountsRouter };
