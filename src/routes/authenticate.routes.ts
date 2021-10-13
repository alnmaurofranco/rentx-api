import { Router } from 'express';

import { AuthenticateUserController } from '../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';

const authenticateUserController = new AuthenticateUserController();

const authenticateRouter = Router();

authenticateRouter.post('/sessions', authenticateUserController.handle);

export { authenticateRouter };
