import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatar } from './UpdateUserAvatar';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;

      const avatar_file = request.file.filename;

      const updateUserAvatar = container.resolve(UpdateUserAvatar);
      await updateUserAvatar.execute({
        user_id,
        avatar_file,
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { UpdateUserAvatarController };
