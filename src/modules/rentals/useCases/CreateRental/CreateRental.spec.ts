import dayjs from 'dayjs';

import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';

import { CreateRental } from './CreateRental';

let rentalsRepository: InMemoryRentalsRepository;
let createRental: CreateRental;
let dayJSDateProvider: DayJSDateProvider;
let carsRepository: InMemoryCarsRepository;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepository = new InMemoryRentalsRepository();
    dayJSDateProvider = new DayJSDateProvider();
    carsRepository = new InMemoryCarsRepository();
    createRental = new CreateRental(
      rentalsRepository,
      dayJSDateProvider,
      carsRepository
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepository.create({
      name: 'Tesla',
      description: 'Carro da Tesla',
      daily_rate: 100,
      fine_amount: 40,
      category_id: '1234567',
      brand: 'Brand Test',
      license_plate: 'A E B',
    });

    const rental = await createRental.execute({
      car_id: car.id,
      user_id: '9999',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await rentalsRepository.create({
        car_id: '111',
        expected_return_date: dayAdd24Hours,
        user_id: '1234',
      });

      await createRental.execute({
        user_id: '1234',
        car_id: '121',
        expected_return_date: dayAdd24Hours,
      });
    }).toBeTruthy();
  });

  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await rentalsRepository.create({
        car_id: 'test1',
        expected_return_date: dayAdd24Hours,
        user_id: '1234',
      });

      await createRental.execute({
        user_id: '321',
        car_id: 'test1',
        expected_return_date: dayAdd24Hours,
      });
    }).toBeTruthy();
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRental.execute({
        user_id: '4321',
        car_id: 'test1',
        expected_return_date: dayjs().toDate(),
      });
    }).toBeTruthy();
  });
});
