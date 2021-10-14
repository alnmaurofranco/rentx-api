import { ICreateCategoryDTO } from '@modules/cars/repositories/ICategoriesRepository';
import { InMemoryCategoriesRepository } from '@modules/cars/repositories/in-memory/InMemoryCategoriesRepository';

import { CreateCategory } from '../CreateCategory/CreateCategory';
import { GetCategory } from './GetCategory';

let categoriesRepository: InMemoryCategoriesRepository;
let getCategory: GetCategory;
let createCategory: CreateCategory;

describe('Get Category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    getCategory = new GetCategory(categoriesRepository);
    createCategory = new CreateCategory(categoriesRepository);
  });

  it('Should be able to get a category', async () => {
    const category: ICreateCategoryDTO = {
      name: 'Category 01',
      description: 'Description 01',
    };

    await createCategory.execute(category);

    const { id } = await categoriesRepository.findByName(category.name);

    const categoryFinded = await getCategory.execute(id);

    expect(categoryFinded).toHaveProperty('id');
  });

  it('Should not be able to get an category with invalid id', async () => {
    expect(async () => {
      await getCategory.execute('invalid-id');
    }).toBeTruthy();
  });
});
