import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';

import { ListAvailableCars } from './ListAvailableCars';

let carsRepository: InMemoryCarsRepository;
let listAvailableCars: ListAvailableCars;

describe('List cars', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    listAvailableCars = new ListAvailableCars(carsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car1 = await carsRepository.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      brand: 'Hyundai',
      fine_amount: 200,
      license_plate: 'ABC123',
      category_id: 'automatico',
    });

    const car2 = await carsRepository.create({
      name: 'Name Car 2',
      description: 'Description Car 2',
      daily_rate: 90,
      brand: 'Toyota',
      fine_amount: 300,
      license_plate: 'A2',
      category_id: 'automatico',
    });

    const cars = await listAvailableCars.execute({});

    expect(cars).toEqual([car1, car2]);
    expect(cars.length).toBe(2);
  });

  it('should be able to list all available cars by brand', async () => {
    const car1 = await carsRepository.create({
      name: 'Car2',
      description: 'Car 2',
      daily_rate: 190,
      brand: 'Car_brand',
      fine_amount: 8000,
      license_plate: 'Z1',
      category_id: 'automatico',
    });

    const cars = await listAvailableCars.execute({
      brand: 'Car_brand',
    });

    expect(cars).toEqual([car1]);
  });

  it('should be able to list all available cars by name', async () => {
    const car1 = await carsRepository.create({
      name: 'Car3',
      description: 'Car 3',
      daily_rate: 190,
      brand: 'Car_brand',
      fine_amount: 8000,
      license_plate: 'Z14',
      category_id: 'automatico',
    });

    const cars = await listAvailableCars.execute({
      name: 'Car3',
    });

    expect(cars).toEqual([car1]);
  });

  it('should be able to list all available cars by category', async () => {
    const car4 = await carsRepository.create({
      name: 'Car4',
      description: 'Car 4',
      daily_rate: 100,
      brand: 'Car_brand_tests',
      fine_amount: 1000,
      license_plate: 'Z145',
      category_id: '123456',
    });

    const cars = await listAvailableCars.execute({
      category_id: '123456',
    });

    expect(cars).toEqual([car4]);
  });
});
