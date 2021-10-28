import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { Car } from '@modules/cars/domain/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

type CreateCarRequest = {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
};

type CreateCarResponse = Car;

@injectable()
class CreateCar {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    license_plate,
    fine_amount,
    brand,
    daily_rate,
    category_id,
  }: CreateCarRequest): Promise<CreateCarResponse> {
    const carsAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carsAlreadyExists) {
      throw new AppError('Car already exists.', 400);
    }

    const car = await this.carsRepository.create({
      name,
      description,
      license_plate,
      fine_amount,
      brand,
      daily_rate,
      category_id,
    });

    return car;
  }
}

export { CreateCar };
