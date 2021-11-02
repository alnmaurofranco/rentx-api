import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/CreateCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/cars/useCases/DeleteCategory/DeleteCategoryController';
import { GetAllCategoryController } from '@modules/cars/useCases/GetAllCategory/GetAllCategoryController';
import { GetCategoryController } from '@modules/cars/useCases/GetCategory/GetCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/ImportCategory/ImportCategoryController';
import { UpdateCategoryController } from '@modules/cars/useCases/UpdateCategory/UpdateCategoryController';

import { ensureAdmin } from '../middlewares/EnsureAdmin';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticated';

const categoriesRouter = Router();
const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const getAllCategoryController = new GetAllCategoryController();
const getCategoryController = new GetCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRouter.get('/', getAllCategoryController.handle);

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.post(
  '/import',
  upload.single('file'),
  ensureAdmin,
  importCategoryController.handle
);

categoriesRouter.post('/', ensureAdmin, createCategoryController.handle);

categoriesRouter.get('/:id', getCategoryController.handle);

categoriesRouter.put('/:id', updateCategoryController.handle);

categoriesRouter.delete('/:id', deleteCategoryController.handle);

export { categoriesRouter };
