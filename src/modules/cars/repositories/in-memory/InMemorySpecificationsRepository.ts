import { Specification } from '@modules/cars/domain/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class InMemorySpecificationsRepository implements ISpecificationsRepository {
  // private static INSTANCE: InMemorySpecificationsRepository;

  constructor(public specifications: Specification[] = []) {}

  async findAll(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    // const specifications = await this.specifications.filter((findSpec) => {
    //   ids.map((findId) => {
    //     if (findSpec.id === findId) {
    //       return findSpec;
    //     }
    //     return null;
    //   });
    //   return null;
    // });

    // return specifications;

    const allSpecifications = this.specifications.filter((findSpecification) =>
      ids.includes(findSpecification.id)
    );

    return allSpecifications;
  }

  // public static getInstance(): InMemorySpecificationsRepository {
  //   if (!InMemorySpecificationsRepository.INSTANCE) {
  //     InMemorySpecificationsRepository.INSTANCE =
  //       new InMemorySpecificationsRepository();
  //   }

  //   return InMemorySpecificationsRepository.INSTANCE;
  // }

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

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }
}

export { InMemorySpecificationsRepository };
