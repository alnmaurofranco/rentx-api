import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { IProfileUserDTO } from '@modules/accounts/dtos/IProfileUserDTO';
import { ProfileMapper } from '@modules/accounts/mappers/ProfileMapper';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

type ProfileUserRequest = {
  userId: string;
};

type ProfileUserResponse = IProfileUserDTO;

@injectable()
export class ProfileUser {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository
  ) {}

  public async execute({
    userId,
  }: ProfileUserRequest): Promise<ProfileUserResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists');
    }

    return ProfileMapper.toDto(user);
  }
}
