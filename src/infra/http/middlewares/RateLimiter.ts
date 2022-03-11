import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import * as redis from 'redis';

import { AppError } from '@infra/http/errors/AppError';

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    sessionTimeout: 20,
  },
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'RateLimiter',
  points: 5,
  duration: 5,
});

export default async function RateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await redisClient.connect();
    await limiter.consume(request.ip);

    next();
  } catch (error) {
    throw new AppError('Too many requests', 429);
  } finally {
    await redisClient.disconnect();
  }
}
