import { Car } from '@modules/cars/domain/Car';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class InMemoryCarsRepository implements ICarsRepository {
  constructor(public cars: Car[] = []) {}

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsAvailable = this.cars.filter((findCar) => {
      if (
        findCar.available === true ||
        (brand && findCar.brand === brand) ||
        (category_id && findCar.category_id === category_id) ||
        (name && findCar.name === name)
      ) {
        return findCar;
      }
      return null;
    });

    return carsAvailable;
  }

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
    specifications,
    id,
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
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((findCar) => findCar.id === id);

    this.cars[carIndex].available = available;
  }
}

export { InMemoryCarsRepository };
