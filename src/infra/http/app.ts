import 'express-async-errors';
import 'reflect-metadata';
import '@config/env';
import { configSwagger } from '@config/swagger';
import configUpload from '@config/upload';
import '@infra/container';
import { AppError } from '@infra/http/errors/AppError';
import { router } from '@infra/http/routes';
import createConnectionTypeORM from '@infra/typeorm';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';

import RateLimiter from './middlewares/RateLimiter';

createConnectionTypeORM();

const app: express.Application = express();

app.use(RateLimiter);

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(configSwagger));

app.use('/avatar', express.static(`${configUpload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${configUpload.tmpFolder}/cars`));

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
