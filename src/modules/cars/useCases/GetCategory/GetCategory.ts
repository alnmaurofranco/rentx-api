import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../infra/errors/AppError';
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
      throw new AppError('Category is not found.', 400);
    }

    return category;
  }
}

export { GetCategory };
