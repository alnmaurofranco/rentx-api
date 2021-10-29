import { v4 as uuid } from 'uuid';

import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { InMemorySpecificationsRepository } from '@modules/cars/repositories/in-memory/InMemorySpecificationsRepository';

import { CreateCarSpecification } from './CreateCarSpecification';

let carsRepository: InMemoryCarsRepository;
let specificationsRepository: InMemorySpecificationsRepository;
let createCarSpecification: CreateCarSpecification;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    specificationsRepository = new InMemorySpecificationsRepository();
    createCarSpecification = new CreateCarSpecification(
      carsRepository,
      specificationsRepository
    );
  });

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      id: uuid(),
      name: 'Name Car 2',
      description: 'Description Car 2',
      daily_rate: 90,
      brand: 'Toyota',
      fine_amount: 300,
      license_plate: 'ABC123',
      category_id: 'automatico',
    });

    const specification = await specificationsRepository.create({
      name: 'specification-test',
      description: 'test of specification',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecification.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
    expect(specificationsCars.specifications).toEqual([specification]);
  });

  it('Should not be able to add a new specification with field car_id empty', async () => {
    expect(async () => {
      await createCarSpecification.execute({
        car_id: '',
        specifications_id: ['specification02', 'specification02'],
      });
    }).toBeTruthy();
  });

  it('Should not be able to add a new specification with field specifications_id empty', async () => {
    expect(async () => {
      await createCarSpecification.execute({
        car_id: 'car_id',
        specifications_id: [],
      });
    }).toBeTruthy();
  });

  it('Should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      await createCarSpecification.execute({
        car_id: 'id-car-no-existent',
        specifications_id: ['specification02', 'specification02'],
      });
    }).toBeTruthy();
  });
});
