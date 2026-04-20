import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error']).default('info'),
  GITHUB_TOKEN: z.string().optional(),
  API_SECRET: z.string().optional(),
  DATABASE_URL: z.string().url().optional(),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid env:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = {
  port: parsed.data.PORT,
  env: parsed.data.NODE_ENV,
  logLevel: parsed.data.LOG_LEVEL,
  githubToken: parsed.data.GITHUB_TOKEN,
  apiSecret: parsed.data.API_SECRET,
  databaseUrl: parsed.data.DATABASE_URL,
};
