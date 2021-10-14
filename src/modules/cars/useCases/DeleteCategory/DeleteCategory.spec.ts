import { ICreateCategoryDTO } from '@modules/cars/repositories/ICategoriesRepository';
import { InMemoryCategoriesRepository } from '@modules/cars/repositories/in-memory/InMemoryCategoriesRepository';

import { CreateCategory } from '../CreateCategory/CreateCategory';
import { DeleteCategory } from './DeleteCategory';

let categoriesRepository: InMemoryCategoriesRepository;
let createCategory: CreateCategory;
let deleteCategory: DeleteCategory;

describe('Delete Category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createCategory = new CreateCategory(categoriesRepository);
    deleteCategory = new DeleteCategory(categoriesRepository);
  });

  it('Should be able to delete an category', async () => {
    const category: ICreateCategoryDTO = {
      name: 'Category 01',
      description: 'Description of Category 01',
    };

    await createCategory.execute(category);

    const { id } = await categoriesRepository.findByName(category.name);

    await deleteCategory.execute(id);

    expect(categoriesRepository.categories.length).toBe(0);
  });

  it('Should not be able to delete category noexisting id', async () => {
    expect(async () => {
      await deleteCategory.execute('invalid-id');
    }).toBeTruthy();
  });
});
