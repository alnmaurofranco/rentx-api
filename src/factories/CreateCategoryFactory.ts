import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { CreateCategory } from '../modules/cars/useCases/CreateCategory/CreateCategory';
import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController';

const CreateCategoryFactory = () => {
  const categoryRepository = CategoriesRepository.getInstance();
  const createCategory = new CreateCategory(categoryRepository);
  const createCategoryController = new CreateCategoryController(createCategory);

  return createCategoryController;
};

export { CreateCategoryFactory };
