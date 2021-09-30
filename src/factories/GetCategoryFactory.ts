import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { GetCategory } from '../modules/cars/useCases/GetCategory/GetCategory';
import { GetCategoryController } from '../modules/cars/useCases/GetCategory/GetCategoryController';

const GetCategoryFactory = (): GetCategoryController => {
  const categoryRepository = new CategoriesRepository();

  const getCategory = new GetCategory(categoryRepository);
  const controller = new GetCategoryController(getCategory);

  return controller;
};

export { GetCategoryFactory };
