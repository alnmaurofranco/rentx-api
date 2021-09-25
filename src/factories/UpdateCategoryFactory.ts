import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { UpdateCategory } from '../modules/cars/useCases/UpdateCategory/UpdateCategory';
import { UpdateCategoryController } from '../modules/cars/useCases/UpdateCategory/UpdateCategoryController';

const UpdateCategoryFactory = () => {
  const categoryRepository = CategoriesRepository.getInstance();

  const updateCategory = new UpdateCategory(categoryRepository);
  const controller = new UpdateCategoryController(updateCategory);

  return controller;
};

export { UpdateCategoryFactory };
