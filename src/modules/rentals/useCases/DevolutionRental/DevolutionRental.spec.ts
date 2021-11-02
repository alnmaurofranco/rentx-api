import { DayJSDateProvider } from '@infra/providers/DateProvider/implementations/DayJSDateProvider';
import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { InMemoryRentalsRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalsRepository';

import { DevolutionRental } from './DevolutionRental';

let rentalsRepository: InMemoryRentalsRepository;
let carsRepository: InMemoryCarsRepository;
let dayJSDateProvider: DayJSDateProvider;
let devolutionRental: DevolutionRental;

describe('Devolution Rental', () => {
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

  it('Should be able to', async () => {
    await devolutionRental.execute({ id: '123', user_id: '123456' });
  });
});
