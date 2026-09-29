#!/usr/bin/env bash
# Index the Hugo public/ output with Pagefind.
# Run after `hugo` / `hugo --minify`. Writes the search bundle to public/pagefind/
# and mirrors it to static/pagefind/ so `hugo server` can serve search locally.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE="${1:-$ROOT/public}"

if [[ ! -d "$SITE" ]]; then
  echo "error: site directory not found: $SITE" >&2
  echo "Build the site first (e.g. hugo --minify)." >&2
  exit 1
fi

npx -y pagefind --site "$SITE"

STATIC_PAGEFIND="$ROOT/static/pagefind"
rm -rf "$STATIC_PAGEFIND"
mkdir -p "$(dirname "$STATIC_PAGEFIND")"
cp -a "$SITE/pagefind" "$STATIC_PAGEFIND"
echo "Mirrored Pagefind bundle to static/pagefind/ (for hugo server)."
