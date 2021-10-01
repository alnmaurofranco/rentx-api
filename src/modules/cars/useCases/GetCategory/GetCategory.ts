import { inject, injectable } from 'tsyringe';

import { Category } from '../../domain/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// type GetCategoryRequest = {
//   id: string;
// };

type GetCategoryResponse = Category;

@injectable()
class GetCategory {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<GetCategoryResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new Error('Category is not found.');
    }

    return category;
  }
}

export { GetCategory };
