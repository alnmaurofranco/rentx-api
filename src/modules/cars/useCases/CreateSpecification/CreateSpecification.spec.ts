import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository';
import { ICreateSpecificationDTO } from '../../repositories/ISpecificationsRepository';
import { CreateSpecification } from './CreateSpecification';

let categoriesRepository: InMemoryCategoriesRepository;
let createSpecification: CreateSpecification;

describe('Create Specification', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    createSpecification = new CreateSpecification(categoriesRepository);
  });

  it('Should be able to create a specification', async () => {
    const specification: ICreateSpecificationDTO = {
      name: 'Vidro blindado',
      description: 'Carros com blindagens',
    };

    await createSpecification.execute(specification);

    const specificationExists = await categoriesRepository.findByName(
      specification.name
    );

    expect(specificationExists).toHaveProperty('id');
    expect(specificationExists).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );
  });

  it('Should not be able to create a specification with specification exists', async () => {
    expect(async () => {
      const specification: ICreateSpecificationDTO = {
        name: 'Vidro blindado',
        description: 'Carros com blindagens',
      };

      await createSpecification.execute(specification);

      await createSpecification.execute(specification);
    }).toBeTruthy();
  });
});
