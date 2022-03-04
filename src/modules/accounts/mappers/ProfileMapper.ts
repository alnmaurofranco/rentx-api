import { instanceToInstance } from 'class-transformer';

import { User } from '@modules/accounts/domain/User';

import { IProfileUserDTO } from '../dtos/IProfileUserDTO';

export class ProfileMapper {
  public static toDto({
    name,
    email,
    avatar,
    avatar_url,
    driver_license,
    created_at,
    updated_at,
  }: User): IProfileUserDTO {
    const user = instanceToInstance({
      name,
      email,
      avatar,
      avatar_url,
      driver_license,
      created_at,
      updated_at,
    });
    return user;
  }
}
