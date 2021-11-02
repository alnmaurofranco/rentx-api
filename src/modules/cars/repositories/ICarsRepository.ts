import { Car } from '@modules/cars/domain/Car';

import { ICreateCarDTO } from '../dtos/ICreateCarDTO';

interface ICarsRepository {
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  create(dto: ICreateCarDTO): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
