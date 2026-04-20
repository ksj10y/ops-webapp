import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';

test('server module loads', async () => {
  const mod = await import('../src/server.js');
  assert.ok(mod.app, 'app is exported');
  assert.equal(typeof mod.app.handle, 'function');
});

test('config parses default env', async () => {
  const { config } = await import('../src/config.js');
  assert.equal(typeof config.port, 'number');
  assert.equal(config.env, 'test');
});
