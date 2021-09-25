import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { ImportCategory } from '../modules/cars/useCases/ImportCategory/ImportCategory';
import { ImportCategoryController } from '../modules/cars/useCases/ImportCategory/ImportCategoryController';

const ImportCategoryFactory = () => {
  const categoryRepository = CategoriesRepository.getInstance();

  const importCategory = new ImportCategory(categoryRepository);
  const controller = new ImportCategoryController(importCategory);

  return controller;
};

export { ImportCategoryFactory };
