import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import prisma from '../PrismaClient/db';

export interface KeyStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<boolean>;
  delete(key: string): Promise<boolean>;
}

// Redis Key Store
// With postgres fallback
export class RedisKeyStore implements KeyStore {
  private client: Redis;
  private fallBackStore: KeyStore;

  constructor(client: Redis, clientFallback: PrismaClient) {
    this.client = client;
    this.fallBackStore = new PostgresKeyStore(clientFallback);
  }

  async get(key: string): Promise<string | null> {
    // cache hit
    try {
      const res = await this.client.get(key);
      if (res) return res;
    } catch (error) {
      console.log('err in redis key store: get', error);
    }
    return await this.fallBackStore.get(key);
  }

  async set(key: string, value: string): Promise<boolean> {
    try {
      await this.client.set(key, value);
    } catch (error) {
      console.log('err in redis key store: set', error);
    }
    const res2 = await this.fallBackStore.set(key, value);
    return res2;
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.log('err in redis key store: delete', error);
    }
    const res2 = await this.fallBackStore.delete(key);
    return res2;
  }
}

// Standalone Postgres key store emulation
export class PostgresKeyStore implements KeyStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  async get(key: string): Promise<string | null> {
    try {
      const res = await this.client.keyValue.findUnique({
        where: { key: key },
      });
      return res?.value ?? null;
    } catch (error) {
      console.log('err in postgres key store: get', error);
      return null;
    }
  }

  async set(key: string, value: string): Promise<boolean> {
    try {
      await this.client.keyValue.upsert({
        where: { key: key },
        create: { key: key, value: value },
        update: { value: value },
      });
      return true;
    } catch (error) {
      console.log('err in postgres key store: set', error);
      return false;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.client.keyValue.delete({
        where: { key: key },
      });
      return true;
    } catch (error) {
      console.log('err in postgres key store: delete', error);
      return false;
    }
  }
}

// init redis connection
function initRedisConnection(): Redis {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error('REDIS_URL is not set in environment variables.');
  }

  const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 5,
  });

  redis.on('error', (_) => {
    console.debug('Redis connection error');
  });
  redis.on('connect', () => {
    console.debug('Redis connection established');
  });
  return redis;
}

// init the store based on radis availability
// radis => if radis url env var present else postgres
export function initStore(): KeyStore {
  let ri = process.env.REDIS_URL;

  if (ri) {
    const redis = initRedisConnection();
    return new RedisKeyStore(redis, prisma);
  } else {
    return new PostgresKeyStore(prisma);
  }
}

const store = initStore();
export default store;
