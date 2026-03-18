// scripts/clear-cache.ts
import 'dotenv/config';
import { redis } from '@/lib/redisClient';

async function clearCache() {
  if (!redis.isOpen) await redis.connect();
  await redis.flushAll();
  console.log('✨ Redis cache cleared 🧹');
  process.exit(0);
}
clearCache().catch((err) => {
  console.error(err);
  process.exit(1);
});