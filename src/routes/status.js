import { Router } from 'express';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const statusRouter = Router();

const __dirname = dirname(fileURLToPath(import.meta.url));
const versionPath = join(__dirname, '..', '..', 'VERSION');

let version = 'unknown';
try {
  version = readFileSync(versionPath, 'utf8').trim();
} catch {
  // fall through — keep "unknown"
}

const startedAt = Date.now();

statusRouter.get('/', (_req, res) => {
  res.json({
    version,
    uptime_s: Math.round((Date.now() - startedAt) / 1000),
  });
});
