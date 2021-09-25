import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

type UpdateCategoryRequest = {
  id: string;
  name: string;
  description: string;
};

type UpdateCategoryResponse = void;

class UpdateCategory {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute({
    id,
    name,
    description,
  }: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new Error('Category is not found.');
    }

    category.name = name;
    category.description = description;

    await this.categoriesRepository.save(category);
  }
}

export { UpdateCategory };
