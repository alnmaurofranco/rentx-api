import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ProfileUser } from './ProfileUser';

export class ProfileUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const profileUser = container.resolve(ProfileUser);

    const result = await profileUser.execute({ userId });

    return response.json(result);
  }
}
