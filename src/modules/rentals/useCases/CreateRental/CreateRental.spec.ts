import dayjs from 'dayjs';

import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';

import { CreateRental } from './CreateRental';

let rentalsRepository: InMemoryRentalsRepository;
let createRental: CreateRental;
let dayJSDateProvider: DayJSDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepository = new InMemoryRentalsRepository();
    dayJSDateProvider = new DayJSDateProvider();
    createRental = new CreateRental(rentalsRepository, dayJSDateProvider);
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRental.execute({
      car_id: '123456',
      user_id: '9999',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRental.execute({
        user_id: '123456',
        car_id: 'test',
        expected_return_date: dayAdd24Hours,
      });

      await createRental.execute({
        user_id: '123456',
        car_id: 'test',
        expected_return_date: dayAdd24Hours,
      });
    }).toBeTruthy();
  });

  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRental.execute({
        user_id: '123',
        car_id: 'test1',
        expected_return_date: dayAdd24Hours,
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
