#!/usr/bin/env bash
set -euo pipefail

VERSIONS=()
EXPLICIT_VERSIONS=0
_NVM_REINSTALL_FROM=""
LTS_MODE=0
FORCE=0
PRUNE=0
SKIP_NPM=0
LATEST_NPM=1
COREPACK=1
QUIET=0
DRY_RUN=0

usage() {
  cat <<'HELP'
Usage: update-nvm [OPTIONS] [VERSION ...]

Update installed Node.js versions with nvm and refresh global npm packages.

If no versions are given, updates every major version already installed via nvm.
Use --lts to update only the current LTS line (lts/*) instead.
Pass explicit versions to update or install those (e.g. update-nvm 24 or update-nvm 28).

When installing a major that is not installed yet, the script asks whether to
copy global npm packages from another installed major.

Options:
  --lts             Update lts/* only (overrides auto-detected installed majors)
  --force, -f       Reinstall even when the latest patch is already installed
  --prune           Remove older patch releases within each updated major line
  --latest-npm      Upgrade npm to the latest version supported by each Node release
                    (default: on)
  --no-latest-npm   Keep the npm version bundled with Node
  --no-corepack     Skip corepack enable for each updated version
  --skip-npm        Reinstall Node only; skip global npm package updates
  --quiet, -q       Minimal output (errors still go to stderr; skips install prompts)
  --dry-run, -n     Show what would run without changing anything
  -h, --help        Show this help

Environment:
  NVM_DIR                 nvm install directory (default: ~/.nvm)
  NVM_UPDATE_VERSIONS     Space-separated versions (explicit list; ignored with --lts)
  NVM_REINSTALL_FROM      When installing a missing major non-interactively, copy
                          global npm packages from this major (e.g. 24)
HELP
}

for arg in "$@"; do
  case "$arg" in
    --lts)
      LTS_MODE=1
      ;;
    --force|-f)
      FORCE=1
      ;;
    --prune)
      PRUNE=1
      ;;
    --latest-npm)
      LATEST_NPM=1
      ;;
    --no-latest-npm)
      LATEST_NPM=0
      ;;
    --no-corepack)
      COREPACK=0
      ;;
    --skip-npm)
      SKIP_NPM=1
      ;;
    --quiet|-q)
      QUIET=1
      ;;
    --dry-run|-n)
      DRY_RUN=1
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      VERSIONS+=("$@")
      EXPLICIT_VERSIONS=1
      break
      ;;
    -*)
      echo "Unknown option: $arg" >&2
      echo "Usage: update-nvm [--lts] [--force|-f] [--prune] [--quiet|-q] [--dry-run|-n] [VERSION ...]" >&2
      exit 1
      ;;
    *)
      VERSIONS+=("$arg")
      EXPLICIT_VERSIONS=1
      ;;
  esac
done

if [[ "$LTS_MODE" -eq 1 && ${#VERSIONS[@]} -eq 0 ]]; then
  VERSIONS=(lts/*)
  EXPLICIT_VERSIONS=1
elif ((${#VERSIONS[@]} == 0)); then
  if [[ -n "${NVM_UPDATE_VERSIONS:-}" ]]; then
    # shellcheck disable=SC2206
    VERSIONS=($NVM_UPDATE_VERSIONS)
    EXPLICIT_VERSIONS=1
  fi
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo "nvm not found at $NVM_DIR/nvm.sh" >&2
  echo "Install nvm: https://github.com/nvm-sh/nvm" >&2
  exit 1
fi

# shellcheck source=/dev/null
. "$NVM_DIR/nvm.sh"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but not available after loading nvm." >&2
  exit 1
fi

log() {
  if [[ "$QUIET" -eq 0 ]]; then
    echo "$@"
  fi
}

log_warn() {
  echo "$@" >&2
}

run() {
  if [[ "$DRY_RUN" -eq 1 ]]; then
    if [[ "$QUIET" -eq 0 ]]; then
      printf '+'
      printf ' %q' "$@"
      printf '\n'
    fi
  else
    "$@"
  fi
}

installed_version() {
  local spec="$1"
  local version

  version="$(nvm version "$spec" 2>/dev/null || true)"
  if [[ -z "$version" || "$version" == "N/A" || "$version" == "none" || "$version" == "system" ]]; then
    return 1
  fi

  printf '%s\n' "$version"
}

remote_version() {
  local spec="$1"
  local version

  version="$(nvm version-remote "$spec" 2>/dev/null || true)"
  if [[ -z "$version" || "$version" == "N/A" ]]; then
    return 1
  fi

  printf '%s\n' "$version"
}

version_major() {
  local version="${1#v}"
  printf '%s\n' "${version%%.*}"
}

list_installed_versions() {
  nvm ls --no-alias --no-colors 2>/dev/null \
    | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' \
    | sort -u -V
}

list_installed_majors() {
  list_installed_versions \
    | sed -E 's/^v([0-9]+)\..*/\1/' \
    | sort -u -n
}

if ((${#VERSIONS[@]} == 0)); then
  mapfile -t VERSIONS < <(list_installed_majors)
  if ((${#VERSIONS[@]} == 0)); then
    log_warn "No Node.js versions installed via nvm."
    exit 0
  fi
fi

update_global_packages() {
  local label="$1"

  if [[ "$SKIP_NPM" -eq 1 ]]; then
    return 0
  fi

  log "==> Updating global npm packages ($label)..."
  run npm update -g
}

enable_corepack() {
  local version_label="${1:-$(node -v)}"

  if [[ "$COREPACK" -eq 0 ]]; then
    return 0
  fi

  if [[ "$DRY_RUN" -eq 0 ]] && ! command -v corepack >/dev/null 2>&1; then
    log "==> corepack not available for $version_label; skipping."
    return 0
  fi

  log "==> Enabling corepack for $version_label..."
  run corepack enable
}

prune_old_patches() {
  local spec="$1"
  local keep major ver

  if ! keep="$(installed_version "$spec")"; then
    return 0
  fi

  major="$(version_major "$keep")"

  while IFS= read -r ver; do
    [[ -z "$ver" ]] && continue
    [[ "$ver" == "$keep" ]] && continue
    [[ "$(version_major "$ver")" != "$major" ]] && continue

    log "==> Pruning old patch: $ver"
    run nvm uninstall "$ver"
  done < <(list_installed_versions)
}

prompt_reinstall_from() {
  local target_spec="$1"
  local major source_version

  _NVM_REINSTALL_FROM=""

  if [[ -n "${NVM_REINSTALL_FROM:-}" ]]; then
    if source_version="$(installed_version "$NVM_REINSTALL_FROM")"; then
      log "==> Reinstalling global packages from Node $NVM_REINSTALL_FROM ($source_version)"
      _NVM_REINSTALL_FROM="$NVM_REINSTALL_FROM"
      return 0
    fi

    log_warn "==> NVM_REINSTALL_FROM=$NVM_REINSTALL_FROM is not installed; installing without package copy."
    return 1
  fi

  if [[ "$QUIET" -eq 1 || "$DRY_RUN" -eq 1 || ! -t 0 ]]; then
    log "==> Installing $target_spec without copying global npm packages."
    return 1
  fi

  local -a sources=()
  while IFS= read -r major; do
    [[ -z "$major" ]] && continue
    [[ "$major" == "$target_spec" ]] && continue
    sources+=("$major")
  done < <(list_installed_majors)

  if ((${#sources[@]} == 0)); then
    log "==> No other installed majors to copy global npm packages from."
    return 1
  fi

  echo
  echo "Node.js $target_spec is not installed yet."
  echo "Reinstall global npm packages from another installed major?"
  echo "  n) No, fresh install (default)"
  for major in "${sources[@]}"; do
    source_version="$(installed_version "$major")"
    echo "  $major) From Node $major ($source_version)"
  done

  while true; do
    local choice
    read -r -p "Choice [N/${sources[*]}]: " choice

    case "$choice" in
      n|N|'')
        log "==> Installing $target_spec without copying global npm packages."
        return 1
        ;;
      *)
        if source_version="$(installed_version "$choice")"; then
          log "==> Reinstalling global packages from Node $choice ($source_version)"
          _NVM_REINSTALL_FROM="$choice"
          return 0
        fi
        echo "Invalid choice. Enter n or one of: ${sources[*]}"
        ;;
    esac
  done
}

build_nvm_install_args() {
  local spec="$1"

  NVM_INSTALL_ARGS=(install "$spec")

  if installed_version "$spec"; then
    run nvm use "$spec" >/dev/null
    NVM_INSTALL_ARGS+=(--reinstall-packages-from=current)
  elif [[ "$EXPLICIT_VERSIONS" -eq 1 ]] && prompt_reinstall_from "$spec"; then
    NVM_INSTALL_ARGS+=(--reinstall-packages-from="$_NVM_REINSTALL_FROM")
  fi

  if [[ "$LATEST_NPM" -eq 1 ]]; then
    NVM_INSTALL_ARGS+=(--latest-npm)
  fi
}

ORIGINAL_NVM="$(nvm current)"
UPDATED_VERSIONS=()
SKIPPED_VERSIONS=()

for version in "${VERSIONS[@]}"; do
  log
  log "========================================"
  log "==> Updating Node.js $version"
  log "========================================"

  remote=""
  installed=""
  if remote="$(remote_version "$version")"; then
    if installed="$(installed_version "$version")"; then
      log "==> Installed: $installed"
      log "==> Latest:    $remote"
    else
      log "==> Node.js $version is not installed yet."
      log "==> Latest:    $remote"
    fi
  else
    log_warn "==> Could not resolve latest version for $version; continuing anyway."
  fi

  if [[ -n "$remote" && -n "$installed" && "$installed" == "$remote" && "$FORCE" -eq 0 ]]; then
    log "==> Already up to date. Skipping install."
    log "==> Use update-nvm --force to reinstall anyway."
    SKIPPED_VERSIONS+=("$installed")
    run nvm use "$version" >/dev/null
    enable_corepack "$installed"
    if [[ "$PRUNE" -eq 1 ]]; then
      prune_old_patches "$version"
    fi
    continue
  fi

  if [[ -n "$installed" ]]; then
    run nvm use "$version" >/dev/null
    update_global_packages "before Node update"
  else
    log "==> Installing fresh."
  fi

  log "==> Installing latest Node.js $version..."
  build_nvm_install_args "$version"
  run nvm "${NVM_INSTALL_ARGS[@]}"

  update_global_packages "after Node update"
  if [[ "$DRY_RUN" -eq 0 ]]; then
    enable_corepack "$(node -v)"
  elif [[ -n "$remote" ]]; then
    enable_corepack "$remote"
  else
    enable_corepack "$version"
  fi

  if [[ "$PRUNE" -eq 1 ]]; then
    prune_old_patches "$version"
  fi

  if [[ "$DRY_RUN" -eq 0 ]]; then
    log "==> Node: $(node -v)"
    log "==> npm:  $(npm -v)"
    UPDATED_VERSIONS+=("$(node -v)")
  elif [[ -n "$remote" ]]; then
    UPDATED_VERSIONS+=("$remote")
  else
    UPDATED_VERSIONS+=("$version")
  fi
done

log
if [[ "$ORIGINAL_NVM" != "none" && "$ORIGINAL_NVM" != "system" ]]; then
  log "==> Restoring previous nvm selection: $ORIGINAL_NVM"
  run nvm use "$ORIGINAL_NVM" >/dev/null
elif nvm alias default >/dev/null 2>&1; then
  log "==> Restoring nvm default..."
  run nvm use default >/dev/null
fi

if [[ "$QUIET" -eq 1 ]]; then
  summary=""
  if ((${#UPDATED_VERSIONS[@]} > 0)); then
    summary="updated ${UPDATED_VERSIONS[*]}"
  fi
  if ((${#SKIPPED_VERSIONS[@]} > 0)); then
    if [[ -n "$summary" ]]; then
      summary+=", "
    fi
    summary+="skipped ${SKIPPED_VERSIONS[*]}"
  fi
  if [[ -z "$summary" ]]; then
    summary="no changes"
  fi
  if [[ "$DRY_RUN" -eq 1 ]]; then
    summary="dry-run: $summary"
  fi
  echo "update-nvm: $summary"
else
  log
  if ((${#UPDATED_VERSIONS[@]} > 0)); then
    log "==> Updated: ${UPDATED_VERSIONS[*]}"
  fi
  if ((${#SKIPPED_VERSIONS[@]} > 0)); then
    log "==> Skipped (already current): ${SKIPPED_VERSIONS[*]}"
  fi
  if [[ "$DRY_RUN" -eq 0 ]]; then
    log "==> Active Node: $(node -v)"
    log "==> Active npm:  $(npm -v)"
  else
    log "==> Dry run complete; no changes were made."
  fi
  log "==> Done."
fi
