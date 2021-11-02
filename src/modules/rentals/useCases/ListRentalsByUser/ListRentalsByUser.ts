import { injectable, inject } from 'tsyringe';

import { Rental } from '@modules/rentals/domain/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

type ListRentalsByUserResponse = Rental[];

@injectable()
class ListRentalsByUser {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<ListRentalsByUserResponse> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUser };
