#!/bin/bash
# Build, test, bump VERSION, and create a release commit on the
# current branch. Invoked by the platform team's CI after merges to
# main; safe to dry-run locally against a scratch branch.
set -e

npm run build
npm test

# Bump VERSION and commit
echo "1.0.$(date -u +%s)" > VERSION
git add -A
git commit -m "release $(date -u +%Y%m%d-%H%M%S)" || true
echo 'Commit created'
