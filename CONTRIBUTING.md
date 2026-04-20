# Contributing

## Workflow

1. Branch off `main`: `git checkout -b your-name/short-topic`
2. Run `npm install` once to wire hooks
3. Keep commits small; `pre-commit` runs `lint-staged` automatically
4. Open a PR against `main`; the CI workflow must pass

## Code style

- Prettier + ESLint (run `npm run lint` before pushing)
- Prefer named exports
- Keep route handlers thin; push logic into `src/` modules

## Tests

Use `node --test`. New routes need at least one happy-path and one
failure-path test in `tests/`.

## Release

The platform team runs `bash deploy.sh` from `main` after merges; do
not run it from feature branches.
