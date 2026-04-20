#!/usr/bin/env node
// Container liveness probe: exit 0 if /health is ok, 1 otherwise.
import { request } from 'node:http';

const port = Number(process.env.PORT || 3000);

const req = request(
  { host: '127.0.0.1', port, path: '/health', method: 'GET', timeout: 1500 },
  (res) => {
    process.exit(res.statusCode === 200 ? 0 : 1);
  },
);
req.on('error', () => process.exit(1));
req.on('timeout', () => { req.destroy(); process.exit(1); });
req.end();
