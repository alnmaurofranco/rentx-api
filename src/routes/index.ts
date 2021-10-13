import { Router } from 'express';

import { accountsRouter } from './accounts.routes';
import { authenticateRouter } from './authenticate.routes';
import { categoriesRouter } from './categories.routes';
import { specificationsRouter } from './specifications.routes';

const router = Router();

router.get('/', (req, res) => res.send('Welcome API'));

router.use(authenticateRouter);
router.use('/accounts', accountsRouter);
router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);

export { router };
