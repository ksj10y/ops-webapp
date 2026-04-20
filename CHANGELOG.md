# Changelog

All notable changes to this project will be documented in this file.

## [0.3.2] - 2026-04-14

### Added
- `/status` route returning uptime + git sha
- pino-http request logging with request-id middleware

### Changed
- Bumped express to 4.21.x

## [0.3.1] - 2026-04-02

### Fixed
- Health endpoint now returns 503 when DB is unreachable instead of
  hanging indefinitely

## [0.3.0] - 2026-03-18

### Added
- Husky pre-commit + lint-staged
- Initial CI workflow (`.github/workflows/ci.yml`)
- `scripts/healthcheck.js` for container liveness probes

## [0.2.0] - 2026-02-10

### Added
- `deploy.sh` release helper
- zod-based env validation in `src/config.js`

## [0.1.0] - 2026-01-22

### Added
- Initial Express skeleton with `/health`
