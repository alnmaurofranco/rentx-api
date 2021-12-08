import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMail } from './SendForgotPasswordMail';

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;

      const sendForgotPasswordMail = container.resolve(SendForgotPasswordMail);
      await sendForgotPasswordMail.execute(email);

      return response.status(201).json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { SendForgotPasswordMailController };
