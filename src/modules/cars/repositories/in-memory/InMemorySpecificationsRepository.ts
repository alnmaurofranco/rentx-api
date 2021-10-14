import { Specification } from '@modules/cars/domain/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class InMemorySpecificationsRepository implements ISpecificationsRepository {
  private static INSTANCE: InMemorySpecificationsRepository;

  private constructor(public specifications: Specification[] = []) {}

  public static getInstance(): InMemorySpecificationsRepository {
    if (!InMemorySpecificationsRepository.INSTANCE) {
      InMemorySpecificationsRepository.INSTANCE =
        new InMemorySpecificationsRepository();
    }

    return InMemorySpecificationsRepository.INSTANCE;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findById(id: string): Promise<Specification> {
    return this.specifications.find(
      (findSpecification) => findSpecification.id === id
    );
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification);
  }
}

export { InMemorySpecificationsRepository };
