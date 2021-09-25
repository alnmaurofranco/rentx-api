import { Category } from '../domain/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
  create(dto: ICreateCategoryDTO): Promise<void>;
  save(category: Category): Promise<void>;
  remove(category: Category): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
