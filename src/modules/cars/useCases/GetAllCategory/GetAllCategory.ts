import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../infra/errors/AppError';
import { Category } from '../../domain/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// type GetAllCategoryRequest = {}

type GetAllCategoryResponse = Category[];

@injectable()
class GetAllCategory {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<GetAllCategoryResponse> {
    const categories = await this.categoriesRepository.findAll();

    if (categories.length < 0) {
      throw new AppError('There are currently no categories.', 400);
    }

    return categories;
  }
}

export { GetAllCategory };
