import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { GetAllCategory } from '../modules/cars/useCases/GetAllCategory/GetAllCategory';
import { GetAllCategoryController } from '../modules/cars/useCases/GetAllCategory/GetAllCategoryController';

const GetAllCategoryFactory = () => {
  const categoryRepository = CategoriesRepository.getInstance();

  const getAllCategory = new GetAllCategory(categoryRepository);
  const controller = new GetAllCategoryController(getAllCategory);

  return controller;
};

export { GetAllCategoryFactory };
