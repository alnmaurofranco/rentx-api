import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

type CreateSpecificationRequest = {
  name: string;
  description: string;
};

type CreateSpecificationResponse = void;

class CreateSpecification {
  constructor(
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    name,
    description,
  }: CreateSpecificationRequest): Promise<CreateSpecificationResponse> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecification };
