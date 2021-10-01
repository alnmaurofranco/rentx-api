import { inject, injectable } from 'tsyringe';

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
      throw new Error('Category already exists!');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategory };
