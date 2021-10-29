import { CarImage } from '@modules/cars/domain/CarImage';

import { ICarsImageRepository } from '../ICarsImageRepository';

class InMemoryCarsImageRepository implements ICarsImageRepository {
  constructor(public carImage: CarImage[] = []) {}

  async findByCarId(car_id: string): Promise<CarImage> {
    return this.carImage.find((findCarImage) => findCarImage.car_id === car_id);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, {
      car_id,
      image_name,
    });

    return carImage;
  }
}

export { InMemoryCarsImageRepository };
