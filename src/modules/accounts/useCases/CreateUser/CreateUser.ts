import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
};

type CreateUserResponse = void;

@injectable()
class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists.', 400);
    }

    const passwordHash = await hash(password, 12);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUser };
