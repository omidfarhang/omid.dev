#!/usr/bin/env bash
# Dev server that does not touch public/ or port 1313.
# For the site owner only — agents use plain `hugo server` / `hugo --minify` instead.
# Usage: ./scripts/hugo-server-dev.sh [-D] [extra hugo server args...]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

exec hugo server \
  --destination .tmp/hugo-server \
  --port 1314 \
  "$@"
