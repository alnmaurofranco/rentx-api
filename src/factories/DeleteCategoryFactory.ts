import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { DeleteCategory } from '../modules/cars/useCases/DeleteCategory/DeleteCategory';
import { DeleteCategoryController } from '../modules/cars/useCases/DeleteCategory/DeleteCategoryController';

const DeleteCategoryFactory = () => {
  const categoryRepository = CategoriesRepository.getInstance();

  const deleteCategory = new DeleteCategory(categoryRepository);
  const controller = new DeleteCategoryController(deleteCategory);

  return controller;
};

export { DeleteCategoryFactory };
