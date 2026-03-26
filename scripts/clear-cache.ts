/**
 * Clears Next.js persistent cache (includes unstable_cache / fetch cache data).
 * Run after deploy or when you need to force fresh DB-backed cached data locally.
 */
import fs from 'fs';
import path from 'path';

const cacheDir = path.join(process.cwd(), '.next', 'cache');

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('✨ Next.js cache cleared (.next/cache removed)');
} else {
  console.log('No .next/cache found (run a build or `npm run dev` first).');
}
