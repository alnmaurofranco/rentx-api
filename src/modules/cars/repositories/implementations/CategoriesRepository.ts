import { Category } from '../../domain/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find((category) => category.id === id);

    if (!category) return null;

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    if (!category) {
      return null;
    }

    return category;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }

  async save(category: Category): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (findCategory) => findCategory.id === category.id
    );

    // eslint-disable-next-line no-unused-expressions
    this.categories[categoryIndex] = category;
  }

  async remove(category: Category): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (findCategory) => findCategory.id === category.id
    );

    this.categories.splice(categoryIndex, 1);
  }
}

export { CategoriesRepository };
