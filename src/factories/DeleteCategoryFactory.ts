import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { DeleteCategory } from '../modules/cars/useCases/DeleteCategory/DeleteCategory';
import { DeleteCategoryController } from '../modules/cars/useCases/DeleteCategory/DeleteCategoryController';

const DeleteCategoryFactory = (): DeleteCategoryController => {
  const categoryRepository = new CategoriesRepository();

  const deleteCategory = new DeleteCategory(categoryRepository);
  const controller = new DeleteCategoryController(deleteCategory);

  return controller;
};

export { DeleteCategoryFactory };
