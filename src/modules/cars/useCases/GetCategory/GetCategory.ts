import { Category } from '../../domain/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// type GetCategoryRequest = {
//   id: string;
// };

type GetCategoryResponse = Category;

class GetCategory {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute(id: string): Promise<GetCategoryResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new Error('Category is not found.');
    }

    return category;
  }
}

export { GetCategory };
