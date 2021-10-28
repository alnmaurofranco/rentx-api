import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { Car } from '@modules/cars/domain/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

type ListAvailableCarsRequest = {
  name?: string;
  brand?: string;
  category_id?: string;
};

type ListAvailableCarsResponse = Car[];

@injectable()
class ListAvailableCars {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    brand,
    category_id,
  }: ListAvailableCarsRequest): Promise<ListAvailableCarsResponse> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name
    );

    if (cars.length < 0) {
      throw new AppError('No cars registered yet');
    }

    return cars;
  }
}

export { ListAvailableCars };
