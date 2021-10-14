import { AppError } from '../../../../infra/errors/AppError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository';
import { CreateCategory } from './CreateCategory';

let categoriesRepository: ICategoriesRepository;
let createCategory: CreateCategory;

describe('Create category value object', () => {
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
    }).rejects.toBeInstanceOf(AppError);
  });
});
