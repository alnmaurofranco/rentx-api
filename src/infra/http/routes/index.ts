import { Router } from 'express';

import { accountsRouter } from './accounts.routes';
import { authenticateRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { passwordRouter } from './password.routes';
import { profileRouter } from './profile.routes';
import { rentalsRouter } from './rentals.routes';
import { specificationsRouter } from './specifications.routes';

const router = Router();

router.get('/', (req, res) => res.send('Welcome to RentxAPI v1.0'));

router.use(authenticateRouter);
router.use('/profile', profileRouter);
router.use('/password', passwordRouter);
router.use('/accounts', accountsRouter);
router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);
router.use('/cars', carsRouter);
router.use('/rentals', rentalsRouter);

export { router };
