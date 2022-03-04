import { Router } from 'express';

import { ProfileUserController } from '../../../modules/accounts/useCases/ProfileUser/ProfileUserController';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const profileRouter = Router();

profileRouter.get('/', ensureAuthenticated, new ProfileUserController().handle);

export { profileRouter };
