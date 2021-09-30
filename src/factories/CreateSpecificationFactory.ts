import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { CreateSpecification } from '../modules/cars/useCases/CreateSpecification/CreateSpecification';
import { CreateSpecificationController } from '../modules/cars/useCases/CreateSpecification/CreateSpecificationController';

const CreateSpecificationFactory = (): CreateSpecificationController => {
  const specificationRepository = SpecificationsRepository.getInstance();

  const createSpecification = new CreateSpecification(specificationRepository);
  const controller = new CreateSpecificationController(createSpecification);

  return controller;
};

export { CreateSpecificationFactory };
