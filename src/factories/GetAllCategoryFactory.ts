import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { GetAllCategory } from '../modules/cars/useCases/GetAllCategory/GetAllCategory';
import { GetAllCategoryController } from '../modules/cars/useCases/GetAllCategory/GetAllCategoryController';

const GetAllCategoryFactory = (): GetAllCategoryController => {
  const categoryRepository = new CategoriesRepository();

  const getAllCategory = new GetAllCategory(categoryRepository);
  const controller = new GetAllCategoryController(getAllCategory);

  return controller;
};

export { GetAllCategoryFactory };
