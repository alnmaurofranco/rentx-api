import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

type CreateSpecificationRequest = {
  name: string;
  description: string;
};

type CreateSpecificationResponse = void;

@injectable()
class CreateSpecification {
  constructor(
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    name,
    description,
  }: CreateSpecificationRequest): Promise<CreateSpecificationResponse> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists', 400);
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecification };
