import { Category } from '../../domain/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// type GetAllCategoryRequest = {}

type GetAllCategoryResponse = Category[];

class GetAllCategory {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<GetAllCategoryResponse> {
    const categories = await this.categoriesRepository.findAll();

    if (categories.length < 0) {
      throw new Error('There are currently no categories.');
    }

    return categories;
  }
}

export { GetAllCategory };
