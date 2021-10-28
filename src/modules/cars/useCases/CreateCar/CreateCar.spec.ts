import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';

import { CreateCar } from './CreateCar';

let createCar: CreateCar;
let carsRepository: InMemoryCarsRepository;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    createCar = new CreateCar(carsRepository);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCar.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      brand: 'Hyundai',
      fine_amount: 200,
      license_plate: 'ABC123',
      category_id: 'automatico',
    });

    expect(car).toHaveProperty('id');
    expect(carsRepository.cars.length).toBe(1);
  });

  it('Should not be able to create a car with exists license plate', async () => {
    expect(async () => {
      await createCar.execute({
        name: 'Name Car',
        description: 'Description Car',
        daily_rate: 100,
        brand: 'Hyundai',
        fine_amount: 200,
        license_plate: 'ABC123',
        category_id: 'automatico',
      });

      await createCar.execute({
        name: 'Name Car 2',
        description: 'Description Car 2',
        daily_rate: 90,
        brand: 'Toyota',
        fine_amount: 300,
        license_plate: 'ABC123',
        category_id: 'automatico',
      });
    }).toBeTruthy();
  });

  it('Should be able to create a car with avaliable true by default', async () => {
    const car = await createCar.execute({
      name: 'Name Car 1',
      description: 'Description Car 1',
      daily_rate: 100,
      brand: 'Hyundai',
      fine_amount: 100,
      license_plate: 'ABC123',
      category_id: 'automatico',
    });

    expect(car.available).toBe(true);
  });
});
