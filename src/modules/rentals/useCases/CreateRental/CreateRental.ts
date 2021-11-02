import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { IDateProvider } from '@infra/providers/DateProvider/IDateProvider';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/domain/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

type CreateRentalRequest = {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
};

type CreateRentalResponse = Rental;

@injectable()
class CreateRental {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayJSDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: CreateRentalRequest): Promise<CreateRentalResponse> {
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable.');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user.");
    }

    // O aluguel deve ter duração mínima de 24horas;
    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimumHour) {
      throw new AppError('Invalid return time.');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRental };
