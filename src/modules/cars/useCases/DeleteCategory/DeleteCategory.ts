import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

// type DeleteCategoryRequest = {
//   id: string;
// };

type DeleteCategoryResponse = void;

@injectable()
class DeleteCategory {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<DeleteCategoryResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category is not found.', 400);
    }

    await this.categoriesRepository.remove(category);
  }
}

export { DeleteCategory };
