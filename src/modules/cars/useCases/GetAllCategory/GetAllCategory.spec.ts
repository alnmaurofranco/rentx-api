import { AppError } from '@infra/http/errors/AppError';
import { InMemoryCategoriesRepository } from '@modules/cars/repositories/in-memory/InMemoryCategoriesRepository';

import { CreateCategory } from '../CreateCategory/CreateCategory';
import { GetAllCategory } from './GetAllCategory';

let categoriesRepository: InMemoryCategoriesRepository;
let createCategory: CreateCategory;
let getAllCategory: GetAllCategory;

describe('Get All Category', () => {
  beforeEach(async () => {
    categoriesRepository = new InMemoryCategoriesRepository();
    getAllCategory = new GetAllCategory(categoriesRepository);
    createCategory = new CreateCategory(categoriesRepository);
  });

  it('Should be able to get all categorys', async () => {
    await createCategory.execute({
      name: 'Category 01',
      description: 'Description 01',
    });

    const categories = await getAllCategory.execute();

    expect(categories.length).toBe(1);
    expect(categories).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Category 01',
        description: 'Description 01',
      }),
    ]);
  });

  it('Should not be able to get all categorys with empty array', async () => {
    expect(async () => {
      await getAllCategory.execute();
    }).rejects.toHaveProperty('message', 'There are currently no categories.');

    expect(async () => {
      await getAllCategory.execute();
    }).rejects.toBeInstanceOf(AppError);
  });
});
