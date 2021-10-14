import { Router } from 'express';
import multer from 'multer';

import { configUpload } from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/CreateUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController';

import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const accountsRouter = Router();

const upload = multer(configUpload.upload('./tmp/avatar'));

accountsRouter.post('/', createUserController.handle);

accountsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle
);

export { accountsRouter };
