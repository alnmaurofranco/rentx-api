import 'express-async-errors';
import 'reflect-metadata';
import '@config/env';
import { configSwagger } from '@config/swagger';
import configUpload from '@config/upload';
import '@infra/container';
import { router } from '@infra/http/routes';
import createConnectionTypeORM from '@infra/typeorm';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import EnsureError from './middlewares/EnsureError';
import RateLimiter from './middlewares/RateLimiter';

createConnectionTypeORM();

const app: express.Application = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(configSwagger));

app.use(RateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(cors());

app.use('/avatar', express.static(`${configUpload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${configUpload.tmpFolder}/cars`));

app.use('/api', router);

app.use(Sentry.Handlers.errorHandler());

app.use(EnsureError);

export default app;
