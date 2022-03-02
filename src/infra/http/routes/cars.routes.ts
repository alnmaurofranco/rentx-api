import { Router } from 'express';
import multer from 'multer';

import configUpload from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/UploadCarImages/UploadCarImageController';

import { ensureAdmin } from '../middlewares/EnsureAdmin';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificationController();
const uploadCarImages = new UploadCarImagesController();

const upload = multer(configUpload);

const carsRouter = Router();

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get('/available', listAvailableCars.handle);

carsRouter.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecification.handle
);

carsRouter.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImages.handle
);

export { carsRouter };
