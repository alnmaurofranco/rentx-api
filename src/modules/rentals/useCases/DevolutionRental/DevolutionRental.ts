import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { IDateProvider } from '@infra/providers/DateProvider/IDateProvider';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/domain/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

type DevolutionRentalRequest = {
  id: string;
  user_id: string;
};

type DevolutionRentalResponse = Rental;

@injectable()
class DevolutionRental {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayJSDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    id,
    user_id,
  }: DevolutionRentalRequest): Promise<DevolutionRentalResponse> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental does not exists.');
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError('Car does not exists.');
    }

    const minimum_daily = 1;

    // Verificar o tempo de aluguel
    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRental };
