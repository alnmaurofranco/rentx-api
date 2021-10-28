import { Car } from '@modules/cars/domain/Car';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class InMemoryCarsRepository implements ICarsRepository {
  constructor(public cars: Car[] = []) {}

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((findCar) => findCar.license_plate === license_plate);
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((findCar) => findCar.id === id);
  }

  async create({
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }
}

export { InMemoryCarsRepository };
