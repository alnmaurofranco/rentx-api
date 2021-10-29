import { injectable, inject } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { Car } from '@modules/cars/domain/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

type CreateCarSpecificationRequest = {
  car_id: string;
  specifications_id: string[];
};

type CreateCarSpecificationResponse = Car;

@injectable()
class CreateCarSpecification {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    car_id,
    specifications_id,
  }: CreateCarSpecificationRequest): Promise<CreateCarSpecificationResponse> {
    if (!car_id || car_id.trim().length < 0) {
      throw new AppError('The field card_id is required', 400);
    }

    const carAlreadyExists = await this.carsRepository.findById(car_id);

    if (!carAlreadyExists) {
      throw new AppError('Car does not exists.', 400);
    }

    if (specifications_id.length < 0) {
      throw new AppError('The field specifications_id is required', 400);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carAlreadyExists.specifications = specifications;

    await this.carsRepository.create(carAlreadyExists);

    return carAlreadyExists;
  }
}

export { CreateCarSpecification };
