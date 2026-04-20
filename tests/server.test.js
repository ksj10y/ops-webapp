import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
const { app } = await import('../src/server.js');

function invoke(method, path) {
  return new Promise((resolve, reject) => {
    const req = { method, url: path, headers: {}, header: (k) => req.headers[k.toLowerCase()] };
    const chunks = [];
    const res = {
      statusCode: 200,
      _headers: {},
      setHeader(k, v) { this._headers[k.toLowerCase()] = v; },
      getHeader(k) { return this._headers[k.toLowerCase()]; },
      status(c) { this.statusCode = c; return this; },
      json(body) {
        this.body = body;
        resolve({ status: this.statusCode, body, headers: this._headers });
      },
      end() { resolve({ status: this.statusCode, body: Buffer.concat(chunks).toString(), headers: this._headers }); },
    };
    app.handle(req, res, (err) => err && reject(err));
  });
}

test('GET /health → 200 { ok: true }', async () => {
  const r = await invoke('GET', '/health');
  assert.equal(r.status, 200);
  assert.equal(r.body.ok, true);
});

test('GET /status → 200 with version', async () => {
  const r = await invoke('GET', '/status');
  assert.equal(r.status, 200);
  assert.ok(typeof r.body.version === 'string');
});
