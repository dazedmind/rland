import { createClient } from 'redis';

const globalForRedis = global as unknown as { redisClient: ReturnType<typeof createClient> };

export const redis = globalForRedis.redisClient ?? createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379')
    }
});

if (process.env.NODE_ENV !== 'production') globalForRedis.redisClient = redis;

if (!redis.isOpen) {
    redis.connect().catch(console.error);
}

export default redis;