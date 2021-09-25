import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryFactory } from '../factories/CreateCategoryFactory';
import { DeleteCategoryFactory } from '../factories/DeleteCategoryFactory';
import { GetAllCategoryFactory } from '../factories/GetAllCategoryFactory';
import { GetCategoryFactory } from '../factories/GetCategoryFactory';
import { ImportCategoryFactory } from '../factories/ImportCategoryFactory';
import { UpdateCategoryFactory } from '../factories/UpdateCategoryFactory';

const categoriesRouter = Router();
const upload = multer({
  dest: './tmp',
});

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
  return ImportCategoryFactory().handle(request, response);
});

categoriesRouter.post('/', (request, response) => {
  return CreateCategoryFactory().handle(request, response);
});

categoriesRouter.get('/', async (request, response) => {
  return GetAllCategoryFactory().handle(request, response);
});

categoriesRouter.get('/:id', async (request, response) => {
  return GetCategoryFactory().handle(request, response);
});

categoriesRouter.put('/:id', async (request, response) => {
  return UpdateCategoryFactory().handle(request, response);
});

categoriesRouter.delete('/:id', async (request, response) => {
  return DeleteCategoryFactory().handle(request, response);
});

export { categoriesRouter };
