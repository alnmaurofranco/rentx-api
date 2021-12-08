import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/RefreshToken/RefreshTokenController';

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

const authenticateRouter = Router();

authenticateRouter.post('/sessions', authenticateUserController.handle);
authenticateRouter.post('/refresh-token', refreshTokenController.handle);

export { authenticateRouter };
