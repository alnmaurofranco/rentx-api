import { CarImage } from '@modules/cars/domain/CarImage';

interface ICarsImageRepository {
  findByCarId(car_id: string): Promise<CarImage>;
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImageRepository };
