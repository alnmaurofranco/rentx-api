import { InMemoryCategoriesRepository } from '@modules/cars/repositories/in-memory/InMemoryCategoriesRepository';

import { CreateCategory } from './CreateCategory';

let categoriesRepository: InMemoryCategoriesRepository;
let createCategory: CreateCategory;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createCategory = new CreateCategory(categoriesRepository);
  });

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category In-Memory 01',
      description: 'Category O1 Description',
    };

    await createCategory.execute({ ...category });

    const categoryCreated = await categoriesRepository.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('Should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category In-Memory 01',
        description: 'Category O1 Description',
      };

      await createCategory.execute({ ...category });

      await createCategory.execute({ ...category });
    }).toBeTruthy();
  });
});
