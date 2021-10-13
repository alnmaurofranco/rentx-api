import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../infra/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { removeAvatarFile } from '../../utils/RemoveAvatarFile';

type UpdateUserAvatarRequest = {
  user_id: string;
  avatar_file: string;
};

type UpdateUserAvatarResponse = void;

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    user_id,
    avatar_file,
  }: UpdateUserAvatarRequest): Promise<UpdateUserAvatarResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }

    if (user.avatar) {
      await removeAvatarFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserAvatar };
