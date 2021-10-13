import { User } from '../domain/User';
import { IAuthenticateUserDTO } from '../dtos';

class AccountsMapper {
  static toDto(userPersistence: User, token: string): IAuthenticateUserDTO {
    return {
      user: {
        id: userPersistence.id,
        name: userPersistence.name,
        email: userPersistence.email,
        driver_license: userPersistence.driver_license,
        isAdmin: userPersistence.isAdmin,
      },
      token,
    };
  }
}

export { AccountsMapper };
