import { getRepository, Repository } from 'typeorm';

import { Category } from '../../domain/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne(id);

    if (!category) return null;

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { name } });

    if (!category) {
      return null;
    }

    return category;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async save(category: Category): Promise<void> {
    const categoryExists = await this.repository.findOne({
      where: { id: category.id },
    });

    // eslint-disable-next-line no-unused-expressions
    await this.repository.save(categoryExists);
  }

  async remove(category: Category): Promise<void> {
    const categoryExists = await this.repository.findOne({
      where: { id: category.id },
    });

    await this.repository.remove(categoryExists);
  }
}

export { CategoriesRepository };
