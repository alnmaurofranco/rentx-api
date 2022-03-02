import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@infra/providers/StorageProvider/IStorageProvider';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';

type UploadCarImagesRequest = {
  car_id: string;
  images_name: string[];
};

type UploadCarImagesResponse = void;

@injectable()
class UploadCarImages {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    car_id,
    images_name,
  }: UploadCarImagesRequest): Promise<UploadCarImagesResponse> {
    images_name.map(async (image) => {
      await this.carsImageRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImages };
