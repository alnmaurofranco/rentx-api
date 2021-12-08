import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/useCases/ResetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

const passwordRouter = Router();

passwordRouter.post('/forgot', sendForgotPasswordMailController.handle);
passwordRouter.post('/reset', resetPasswordUserController.handle);

export { passwordRouter };
