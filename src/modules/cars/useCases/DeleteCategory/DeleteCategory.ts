import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// type DeleteCategoryRequest = {
//   id: string;
// };

type DeleteCategoryResponse = void;

class DeleteCategory {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute(id: string): Promise<DeleteCategoryResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new Error('Category is not found.');
    }

    await this.categoriesRepository.remove(category);
  }
}

export { DeleteCategory };
