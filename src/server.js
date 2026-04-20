import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import { config } from './config.js';
import { requestId } from './middleware/request-id.js';
import { healthRouter } from './routes/health.js';
import { statusRouter } from './routes/status.js';

const logger = pino({ level: config.logLevel });
const app = express();

app.use(requestId);
app.use(pinoHttp({ logger }));
app.use(express.json());

app.use('/health', healthRouter);
app.use('/status', statusRouter);

app.use((err, _req, res, _next) => {
  logger.error({ err }, 'unhandled error');
  res.status(500).json({ error: 'internal_error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    logger.info({ port: config.port }, 'ops-webapp listening');
  });
}

export { app };
