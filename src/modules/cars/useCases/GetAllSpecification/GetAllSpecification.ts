import { inject, injectable } from 'tsyringe';

import { AppError } from '@infra/http/errors/AppError';
import { Specification } from '@modules/cars/domain/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

type GetAllSpecificationResponse = Specification[];

@injectable()
class GetAllSpecification {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<GetAllSpecificationResponse> {
    const specifications = await this.specificationsRepository.findAll();

    if (specifications.length < 0 || specifications.length === 0) {
      throw new AppError('Not registered specification yet');
    }

    return specifications;
  }
}

export { GetAllSpecification };
