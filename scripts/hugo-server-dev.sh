#!/usr/bin/env bash
# Dev server that does not touch public/ or port 1313.
# For the site owner only — agents use plain `hugo server` / `hugo --minify` instead.
# On start: one-shot build into DEST, Pagefind index (mirrored to static/pagefind/), then serve.
# Usage: ./scripts/hugo-server-dev.sh [-D] [extra hugo server args...]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

DEST=".tmp/hugo-server"

# Forward content-inclusion flags to the prebuild so the index matches the server.
PREBUILD_ARGS=()
for arg in "$@"; do
  case "$arg" in
    -D|--buildDrafts|--buildFuture|--buildExpired) PREBUILD_ARGS+=("$arg") ;;
  esac
done

echo "Building ${DEST} for search index..."
hugo --destination "$DEST" "${PREBUILD_ARGS[@]}"

echo "Running Pagefind index..."
"$ROOT/scripts/pagefind-index.sh" "$ROOT/$DEST"

exec hugo server \
  --destination "$DEST" \
  --port 1314 \
  "$@"
