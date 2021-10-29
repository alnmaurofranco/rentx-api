import { Specification } from '@modules/cars/domain/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findAll(): Promise<Specification[]>;
  findByIds(ids: string[]): Promise<Specification[]>;
  findById(id: string): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  create(dto: ICreateSpecificationDTO): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
