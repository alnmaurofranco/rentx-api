import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { specificationsRouter } from './specifications.routes';

const router = Router();

router.get('/', (req, res) => res.send('Welcome API'));

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);

export { router };
