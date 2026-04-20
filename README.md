# ops-webapp

Small internal Express service for fleet ops. Exposes a health
endpoint and a status page consumed by the platform team's build
dashboard.

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
git clone https://github.com/ksj10y/ops-webapp.git
cd ops-webapp
npm install
cp .env.example .env   # fill in values for your environment
```

`npm install` will wire up git hooks via husky (`prepare` script).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | start the server with auto-reload |
| `npm start` | start the server |
| `npm test` | run unit tests |
| `npm run build` | produce a release bundle under `dist/` |
| `npm run lint` | eslint over `src/` and `tests/` |
| `bash deploy.sh` | build, test, bump `VERSION`, create a release commit |

## Layout

```
src/
  server.js          # express bootstrap
  config.js          # env loading + zod validation
  routes/            # health, status
  middleware/        # request-id
tests/               # node:test suites
scripts/healthcheck.js
```

## Deployment

The platform team's CI runs `bash deploy.sh` on the main branch after
merges. Locally you can dry-run it against a scratch branch.

## License

MIT — see [LICENSE](./LICENSE).
