import { Rental } from '@modules/rentals/domain/Rental';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

class InMemoryRentalsRepository implements IRentalsRepository {
  constructor(public rentals: Rental[] = []) {}

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (findRental) => findRental.car_id === car_id && !findRental.end_date
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (findRental) => findRental.user_id === user_id && !findRental.end_date
    );
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      start_date: new Date(),
      user_id,
      car_id,
      expected_return_date,
      // created_at: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
}

export { InMemoryRentalsRepository };
