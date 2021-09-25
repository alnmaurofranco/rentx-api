import { Specification } from '../domain/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findById(id: string): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  create(dto: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
