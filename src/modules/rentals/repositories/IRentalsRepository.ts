import { Rental } from '@modules/rentals/domain/Rental';

import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(dto: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
