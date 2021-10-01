import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

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
      throw new Error('Category is not found.');
    }

    await this.categoriesRepository.remove(category);
  }
}

export { DeleteCategory };
