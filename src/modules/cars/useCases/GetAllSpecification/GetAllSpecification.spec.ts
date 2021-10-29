import { InMemorySpecificationsRepository } from '@modules/cars/repositories/in-memory/InMemorySpecificationsRepository';

import { GetAllSpecification } from './GetAllSpecification';

let specificationsRepository: InMemorySpecificationsRepository;
let getAllSpecification: GetAllSpecification;

describe('Get All Specification', () => {
  beforeEach(() => {
    specificationsRepository = new InMemorySpecificationsRepository();
    getAllSpecification = new GetAllSpecification(specificationsRepository);
  });

  it('Should be able to get all specifications', async () => {
    const specification01 = await specificationsRepository.create({
      name: 'Specification-test',
      description: 'Test 01',
    });

    const specifications = await getAllSpecification.execute();

    expect(specifications).toEqual([specification01]);
    expect(specifications.length).toBe(1);
    expect(specificationsRepository.specifications.length).toBe(1);
  });

  it('Should not be able to get all specification with not registered any specification yet', async () => {
    expect(specificationsRepository.specifications.length).toBe(0);
    expect(async () => {
      await getAllSpecification.execute();
    }).toBeTruthy();
  });
});
