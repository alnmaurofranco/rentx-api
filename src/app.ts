import express from 'express';
import swaggerUI from 'swagger-ui-express';

import './database';
import './infra/container';

import { configSwagger } from './config/swagger';
import { router } from './routes';

const app: express.Application = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(configSwagger));

app.use('/api', router);

export default app;
