import { InMemoryCategoriesRepository } from '@modules/cars/repositories/in-memory/InMemoryCategoriesRepository';

import { CreateCategory } from '../CreateCategory/CreateCategory';
import { UpdateCategory } from './UpdateCategory';

let categoriesRepository: InMemoryCategoriesRepository;
let updateCategory: UpdateCategory;
let createCategory: CreateCategory;

describe('Update Category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    updateCategory = new UpdateCategory(categoriesRepository);
    createCategory = new CreateCategory(categoriesRepository);
  });

  it('Should be able to update a category', async () => {
    const category = {
      name: 'Category 01',
      description: 'Description 01',
    };

    await createCategory.execute(category);

    const { id } = await categoriesRepository.findByName(category.name);

    await updateCategory.execute({
      id,
      name: 'Car Category 01',
      description: category.description,
    });

    expect(categoriesRepository.categories.length).toBe(1);
    expect(categoriesRepository.categories[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Car Category 01',
        description: 'Description 01',
      })
    );
  });

  it('Should not be able update a category with invalid id', async () => {
    expect(async () => {
      const category = {
        name: 'Category 01',
        description: 'Description 01',
      };

      await createCategory.execute(category);

      await updateCategory.execute({
        id: 'invalid-id',
        name: 'Car Category 01',
        description: 'Description 01',
      });
    }).toBeTruthy();
  });
});
