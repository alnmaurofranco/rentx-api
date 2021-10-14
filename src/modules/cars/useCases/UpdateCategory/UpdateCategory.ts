import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

type UpdateCategoryRequest = {
  id: string;
  name: string;
  description: string;
};

type UpdateCategoryResponse = void;

@injectable()
class UpdateCategory {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    id,
    name,
    description,
  }: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category is not found.', 400);
    }

    category.name = name;
    category.description = description;

    await this.categoriesRepository.save(category);
  }
}

export { UpdateCategory };
