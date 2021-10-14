import { Repository, getRepository } from 'typeorm';

import { Specification } from '@modules/cars/domain/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    if (!specification) return null;

    return specification;
  }

  async findById(id: string): Promise<Specification> {
    const specification = await this.repository.findOne(id);

    if (!specification) return null;

    return specification;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }
}

export { SpecificationsRepository };
