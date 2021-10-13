import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../infra/errors/AppError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

type CreateCategoryRequest = {
  name: string;
  description: string;
};

type CreateCategoryResponse = void;

@injectable()
class CreateCategory {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    name,
    description,
  }: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!', 400);
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategory };
