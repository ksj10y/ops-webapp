import { randomUUID } from 'node:crypto';

export function requestId(req, res, next) {
  const incoming = req.header('x-request-id');
  const id = incoming && incoming.length <= 128 ? incoming : randomUUID();
  req.id = id;
  res.setHeader('x-request-id', id);
  next();
}
