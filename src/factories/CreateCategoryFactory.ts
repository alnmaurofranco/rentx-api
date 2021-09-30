import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { CreateCategory } from '../modules/cars/useCases/CreateCategory/CreateCategory';
import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController';

const CreateCategoryFactory = (): CreateCategoryController => {
  const categoryRepository = new CategoriesRepository();
  const createCategory = new CreateCategory(categoryRepository);
  const createCategoryController = new CreateCategoryController(createCategory);

  return createCategoryController;
};

export { CreateCategoryFactory };
