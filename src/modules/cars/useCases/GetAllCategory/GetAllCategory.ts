import { inject, injectable } from 'tsyringe';

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
      throw new Error('There are currently no categories.');
    }

    return categories;
  }
}

export { GetAllCategory };
