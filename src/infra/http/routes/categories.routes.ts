import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/CreateCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/cars/useCases/DeleteCategory/DeleteCategoryController';
import { GetAllCategoryController } from '@modules/cars/useCases/GetAllCategory/GetAllCategoryController';
import { GetCategoryController } from '@modules/cars/useCases/GetCategory/GetCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/ImportCategory/ImportCategoryController';
import { UpdateCategoryController } from '@modules/cars/useCases/UpdateCategory/UpdateCategoryController';

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

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', getAllCategoryController.handle);

categoriesRouter.get('/:id', getCategoryController.handle);

categoriesRouter.put('/:id', updateCategoryController.handle);

categoriesRouter.delete('/:id', deleteCategoryController.handle);

export { categoriesRouter };
