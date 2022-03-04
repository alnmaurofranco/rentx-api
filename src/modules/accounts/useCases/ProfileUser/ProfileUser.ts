import { inject, injectable } from 'tsyringe';

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
      throw new Error('User not found');
    }

    return ProfileMapper.toDto(user);
  }
}
