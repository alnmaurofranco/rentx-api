import dayjs from 'dayjs';

import { AppError } from '@infra/http/errors/AppError';
import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';

import { DevolutionRental } from './DevolutionRental';

let rentalsRepository: InMemoryRentalsRepository;
let carsRepository: InMemoryCarsRepository;
let dayJSDateProvider: DayJSDateProvider;
let devolutionRental: DevolutionRental;

describe('Devolution Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepository = new InMemoryRentalsRepository();
    carsRepository = new InMemoryCarsRepository();
    dayJSDateProvider = new DayJSDateProvider();
    devolutionRental = new DevolutionRental(
      rentalsRepository,
      carsRepository,
      dayJSDateProvider
    );
  });

  it('Should be able to devolution rental', async () => {
    const car = await carsRepository.create({
      name: 'Tesla',
      description: 'Carro da Tesla',
      daily_rate: 100,
      fine_amount: 40,
      category_id: '1234567',
      brand: 'Brand Test',
      license_plate: 'A E B',
    });

    const { id } = await rentalsRepository.create({
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
      user_id: '123456',
    });

    const result = await devolutionRental.execute({ id, user_id: '123456' });

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('end_date');
    expect(result).toHaveProperty('total');
  });

  it('Should not be able to devolution rental with rental does not exists', async () => {
    await expect(
      devolutionRental.execute({
        id: '11111',
        user_id: '123456',
      })
    ).rejects.toEqual(new AppError('Rental does not exists.'));
  });

  it('Should not be able to devolution rental with car does not exists', async () => {
    const { id } = await rentalsRepository.create({
      car_id: 'non-existent-car',
      expected_return_date: dayAdd24Hours,
      user_id: '123456',
    });

    await expect(
      devolutionRental.execute({
        id,
        user_id: '123456',
      })
    ).rejects.toEqual(new AppError('Car does not exists.'));
  });
});
