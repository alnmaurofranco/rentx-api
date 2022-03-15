import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { IStorageProvider } from '@infra/providers/StorageProvider/IStorageProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

type UpdateUserAvatarRequest = {
  user_id: string;
  avatar_file: string;
};

type UpdateUserAvatarResponse = void;

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
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
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatar_file, 'avatar');

    user.avatar = avatar_file;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserAvatar };
