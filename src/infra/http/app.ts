import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Response, Request } from 'express';
import swaggerUI from 'swagger-ui-express';

import '@infra/container';

import { configSwagger } from '@config/swagger';
import { AppError } from '@infra/http/errors/AppError';
import { router } from '@infra/http/routes';
import createConnectionTypeORM from '@infra/typeorm';

createConnectionTypeORM();

const app: express.Application = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(configSwagger));

app.use('/api', router);

app.use(
  // eslint-disable-next-line consistent-return
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ error: error.message });
    }

    next();
  }
);

export default app;
