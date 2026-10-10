#!/usr/bin/env bash
set -euo pipefail

# Bump when publishing changes to this script (used for self-update checks).
SCRIPT_VERSION="1.3.0"
SCRIPT_URL="${UPDATE_NVM_SCRIPT_URL:-https://omid.dev/scripts/update-nvm.sh}"

VERSIONS=()
EXPLICIT_VERSIONS=0
_NVM_REINSTALL_FROM=""
LTS_MODE=0
FORCE=0
PRUNE=0
SKIP_NPM=0
NPM_ONLY=0
LATEST_NPM=1
COREPACK=1
QUIET=0
DRY_RUN=0
PLAIN=0
SELF_UPDATE=0

usage() {
  cat <<'HELP'
Usage: update-nvm [OPTIONS] [VERSION ...]

Update installed Node.js versions with nvm and refresh global npm packages.

If no versions are given, updates every major version already installed via nvm.
Use --lts to update only the current LTS line (lts/*) instead.
Pass explicit versions to update or install those (e.g. update-nvm 24 or update-nvm 28).

When a major is already on the latest patch, Node is left alone but global npm
packages are still refreshed (unless --skip-npm). Use --npm-only to skip Node
installs entirely and only refresh npm.

When installing a major that is not installed yet, the script asks whether to
copy global npm packages from another installed major.

On interactive runs, if a newer update-nvm is available on omid.dev, you are
asked whether to self-update (default: Yes). Quiet/cron and non-TTY runs skip
that prompt.

Options:
  --lts             Update lts/* only (overrides auto-detected installed majors)
  --force, -f       Reinstall even when the latest patch is already installed
  --prune           Remove older patch releases within each updated major line
  --latest-npm      Upgrade npm to the latest version supported by each Node release
                    (default: on)
  --no-latest-npm   Keep the npm version bundled with Node
  --no-corepack     Skip corepack enable for each updated version
  --skip-npm        Reinstall Node only; skip global npm package updates
  --npm-only        Skip Node installs; only refresh npm and global packages
  --quiet, -q       Minimal output (errors still go to stderr; skips install prompts)
  --dry-run, -n     Show what would run without changing anything
  --plain, -p       Scroll-only output: no alternate screen buffer or frame redraws
  --self-update     Download and install the latest update-nvm script from omid.dev
                    (does not update Node or npm)
  --version         Print this script's version and exit
  -h, --help        Show this help

Environment:
  NVM_DIR                 nvm install directory (default: ~/.nvm)
  NVM_UPDATE_VERSIONS     Space-separated versions (explicit list; ignored with --lts)
  NVM_REINSTALL_FROM      When installing a missing major non-interactively, copy
                          global npm packages from this major (e.g. 24)
  UPDATE_NVM_SCRIPT_URL   Override script URL for self-update (default: omid.dev)
  UPDATE_NVM_SKIP_SELF_CHECK  Set to 1 to skip the newer-script availability check
  NO_COLOR                Set to disable ANSI colors
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
    --npm-only)
      NPM_ONLY=1
      ;;
    --quiet|-q)
      QUIET=1
      ;;
    --dry-run|-n)
      DRY_RUN=1
      ;;
    --plain|-p)
      PLAIN=1
      ;;
    --self-update)
      SELF_UPDATE=1
      ;;
    --version)
      echo "update-nvm ${SCRIPT_VERSION}"
      exit 0
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
      echo "Usage: update-nvm [--lts] [--force|-f] [--prune] [--npm-only] [--skip-npm] [--quiet|-q] [--dry-run|-n] [--plain|-p] [--self-update] [--version] [VERSION ...]" >&2
      exit 1
      ;;
    *)
      VERSIONS+=("$arg")
      EXPLICIT_VERSIONS=1
      ;;
  esac
done

if [[ "$NPM_ONLY" -eq 1 && "$SKIP_NPM" -eq 1 ]]; then
  echo "--npm-only and --skip-npm cannot be used together." >&2
  exit 1
fi

# Exit 0 if equal, 1 if $1 > $2, 2 if $1 < $2
version_compare() {
  local IFS=.
  local -a left=($1) right=($2)
  local i max=${#left[@]}

  if ((${#right[@]} > max)); then
    max=${#right[@]}
  fi

  for ((i = 0; i < max; i++)); do
    local a=${left[i]:-0}
    local b=${right[i]:-0}

    if ((10#$a > 10#$b)); then
      return 1
    fi
    if ((10#$a < 10#$b)); then
      return 2
    fi
  done

  return 0
}

script_version_from() {
  local source="$1"

  sed -n 's/^SCRIPT_VERSION="\([^"]*\)".*/\1/p' "$source" | head -1
}

remote_script_version() {
  if ! command -v curl >/dev/null 2>&1; then
    return 1
  fi

  curl -fsSL --connect-timeout 5 --max-time 15 "$SCRIPT_URL" 2>/dev/null \
    | sed -n 's/^SCRIPT_VERSION="\([^"]*\)".*/\1/p' | head -1
}

self_update_script() {
  local remote script_path tmp new_version cmp

  if ! command -v curl >/dev/null 2>&1; then
    echo "curl is required for self-update." >&2
    exit 1
  fi

  remote="$(remote_script_version)" || true
  if [[ -z "$remote" ]]; then
    echo "Could not fetch script version from $SCRIPT_URL" >&2
    exit 1
  fi

  cmp=2
  version_compare "$SCRIPT_VERSION" "$remote" && cmp=0 || cmp=$?

  case "$cmp" in
    0)
      echo "update-nvm ${SCRIPT_VERSION} is already up to date."
      exit 0
      ;;
    1)
      echo "Local update-nvm ${SCRIPT_VERSION} is newer than remote ${remote}."
      exit 0
      ;;
  esac

  script_path="$(readlink -f "${BASH_SOURCE[0]}")"
  tmp="$(mktemp)"
  trap 'rm -f "$tmp"' EXIT

  curl -fsSL "$SCRIPT_URL" -o "$tmp"
  new_version="$(script_version_from "$tmp")"
  if [[ -z "$new_version" || "$new_version" != "$remote" ]]; then
    echo "Downloaded script does not look like a valid update-nvm release." >&2
    exit 1
  fi

  chmod +x "$tmp"
  mv -f "$tmp" "$script_path"
  trap - EXIT

  echo "update-nvm updated to ${new_version}."
  exit 0
}

if [[ "$SELF_UPDATE" -eq 1 ]]; then
  self_update_script
  exit 0
fi

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

# default may be unset or unusable (e.g. lts/* not installed); pick latest installed.
if ! command -v npm >/dev/null 2>&1; then
  nvm use node >/dev/null 2>&1 || true
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but not available after loading nvm." >&2
  exit 1
fi

USE_COLOR=0
if [[ "$QUIET" -eq 0 && -t 1 && -z "${NO_COLOR:-}" && "${TERM:-}" != "dumb" ]]; then
  USE_COLOR=1
fi

C_RESET=""
C_BOLD=""
C_DIM=""
C_CYAN=""
C_GREEN=""
C_YELLOW=""
C_RED=""
if [[ "$USE_COLOR" -eq 1 ]]; then
  C_RESET=$'\033[0m'
  C_BOLD=$'\033[1m'
  C_DIM=$'\033[2m'
  C_CYAN=$'\033[36m'
  C_GREEN=$'\033[32m'
  C_YELLOW=$'\033[33m'
  C_RED=$'\033[31m'
fi

# Parallel to VERSIONS: todo | doing | done | failed | skipped
STEP_STATE=()
STEP_DETAIL=()
ALT_SCREEN=0

can_use_alt_screen() {
  [[ "$PLAIN" -eq 0 && "$QUIET" -eq 0 && "$DRY_RUN" -eq 0 && -t 1 && "${TERM:-}" != "dumb" ]]
}

enter_alt_screen() {
  if can_use_alt_screen && [[ "$ALT_SCREEN" -eq 0 ]]; then
    # Dedicated buffer: redraws stay here; main scrollback is restored on leave.
    printf '\033[?1049h\033[H\033[2J'
    ALT_SCREEN=1
    trap 'leave_alt_screen' EXIT INT TERM HUP
  fi
}

leave_alt_screen() {
  if [[ "$ALT_SCREEN" -eq 1 ]]; then
    printf '\033[?1049l'
    ALT_SCREEN=0
    trap - EXIT INT TERM HUP
  fi
}

print_banner() {
  if [[ "$QUIET" -ne 0 ]]; then
    return 0
  fi

  echo "${C_CYAN}${C_BOLD}"
  cat <<'BANNER'
 _   _ ____  ____    _  _____ _____      _   ___     ____  __
| | | |  _ \|  _ \  / \|_   _| ____|    | \ | \ \   / /  \/  |
| | | | |_) | | | |/ _ \ | | |  _| _____|  \| |\ \ / /| |\/| |
| |_| |  __/| |_| / ___ \| | | |__|_____| |\  | \ V / | |  | |
 \___/|_|   |____/_/   \_\_| |_____|    |_| \_|  \_/  |_|  |_|
BANNER
  echo "${C_RESET}${C_DIM}  keep Node majors current  ·  v${SCRIPT_VERSION}${C_RESET}"
  echo
}

print_progress_board() {
  local i state label icon color detail note

  if [[ "$QUIET" -ne 0 ]]; then
    return 0
  fi

  echo "${C_BOLD} Progress${C_RESET}"
  for ((i = 0; i < TOTAL_STEPS; i++)); do
    state="${STEP_STATE[i]:-todo}"
    detail="${STEP_DETAIL[i]:-}"
    label="Node.js ${VERSIONS[i]}"
    if [[ "$NPM_ONLY" -eq 1 ]]; then
      label+=" (npm)"
    fi

    case "$state" in
      done)
        icon="✓"
        color="$C_GREEN"
        note="done"
        ;;
      skipped)
        icon="○"
        color="$C_YELLOW"
        note="skipped"
        ;;
      failed)
        icon="✗"
        color="$C_RED"
        note="failed"
        ;;
      doing)
        icon="→"
        color="$C_CYAN"
        note="doing"
        ;;
      *)
        icon="·"
        color="$C_DIM"
        note="todo"
        ;;
    esac

    if [[ -n "$detail" ]]; then
      note+=" · ${detail}"
    fi

    printf '  %s%s%s  [%d/%d] %-22s %s\n' \
      "$color" "$icon" "$C_RESET" \
      "$((i + 1))" "$TOTAL_STEPS" \
      "$label" \
      "${color}${note}${C_RESET}"
  done
  echo "${C_DIM}────────────────────────────────────────────────────────${C_RESET}"
}

# Redraw banner + progress board inside the alt screen. --plain skips redraws
# (scroll-only). Without alt screen (dry-run / non-TTY), print a compact board.
render_frame() {
  if [[ "$PLAIN" -eq 1 || "$QUIET" -eq 1 ]]; then
    return 0
  fi

  if [[ "$ALT_SCREEN" -eq 1 ]]; then
    printf '\033[H\033[2J'
    print_banner
    print_progress_board
    echo
  else
    echo
    print_progress_board
    echo
  fi
}

set_step_state() {
  local idx="$1"
  local state="$2"
  local detail="${3:-}"

  STEP_STATE[idx]="$state"
  STEP_DETAIL[idx]="$detail"
}

log() {
  if [[ "$QUIET" -eq 0 ]]; then
    echo "$@"
  fi
}

log_step() {
  if [[ "$QUIET" -eq 0 ]]; then
    echo "${C_BOLD}${C_CYAN}$*${C_RESET}"
  fi
}

log_info() {
  if [[ "$QUIET" -eq 0 ]]; then
    echo "  ${C_DIM}$*${C_RESET}"
  fi
}

log_action() {
  if [[ "$QUIET" -eq 0 ]]; then
    echo "  ${C_CYAN}→${C_RESET} $*"
  fi
}

log_ok() {
  if [[ "$QUIET" -eq 0 ]]; then
    echo "  ${C_GREEN}✓${C_RESET} $*"
  fi
}

log_skip() {
  if [[ "$QUIET" -eq 0 ]]; then
    echo "  ${C_YELLOW}○${C_RESET} $*"
  fi
}

log_warn() {
  echo "  ${C_YELLOW}!${C_RESET} $*" >&2
}

log_fail() {
  echo "  ${C_RED}✗${C_RESET} $*" >&2
}

notify_script_update() {
  local remote cmp answer

  if [[ "${UPDATE_NVM_SKIP_SELF_CHECK:-0}" == 1 || "$QUIET" -eq 1 || "$DRY_RUN" -eq 1 ]]; then
    return 0
  fi

  remote="$(remote_script_version)" || return 0
  [[ -z "$remote" ]] && return 0

  cmp=2
  version_compare "$SCRIPT_VERSION" "$remote" && cmp=0 || cmp=$?
  if [[ "$cmp" -ne 2 ]]; then
    return 0
  fi

  if [[ -t 0 && -t 1 ]]; then
    echo
    read -r -p "update-nvm ${remote} is available (installed: ${SCRIPT_VERSION}). Update now? [Y/n] " answer
    case "$answer" in
      ''|y|Y|yes|YES|Yes)
        self_update_script
        ;;
      n|N|no|NO|No)
        log_info "Skipped. Run: update-nvm --self-update"
        ;;
      *)
        log_info "Skipped. Run: update-nvm --self-update"
        ;;
    esac
  else
    log_warn "update-nvm $remote is available (installed: $SCRIPT_VERSION). Run: update-nvm --self-update"
  fi
}

run() {
  if [[ "$DRY_RUN" -eq 1 ]]; then
    if [[ "$QUIET" -eq 0 ]]; then
      printf '  +'
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

  log_action "Updating global npm packages ($label)…"
  run npm update -g
}

upgrade_npm() {
  local label="$1"

  if [[ "$LATEST_NPM" -eq 0 ]]; then
    return 0
  fi

  log_action "Upgrading npm ($label)…"
  run nvm install-latest-npm
}

# Refresh npm + global packages + corepack for the currently selected Node.
refresh_npm_stack() {
  local label="$1"

  upgrade_npm "$label"
  update_global_packages "$label"
  enable_corepack "$label"
}

enable_corepack() {
  local version_label="${1:-$(node -v)}"

  if [[ "$COREPACK" -eq 0 ]]; then
    return 0
  fi

  if [[ "$DRY_RUN" -eq 0 ]] && ! command -v corepack >/dev/null 2>&1; then
    log_skip "corepack not available for $version_label"
    return 0
  fi

  log_action "Enabling corepack for $version_label…"
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

    log_action "Pruning old patch $ver…"
    run nvm uninstall "$ver"
  done < <(list_installed_versions)
}

prompt_reinstall_from() {
  local target_spec="$1"
  local major source_version

  _NVM_REINSTALL_FROM=""

  if [[ -n "${NVM_REINSTALL_FROM:-}" ]]; then
    if source_version="$(installed_version "$NVM_REINSTALL_FROM")"; then
      log_action "Copying global packages from Node $NVM_REINSTALL_FROM ($source_version)"
      _NVM_REINSTALL_FROM="$NVM_REINSTALL_FROM"
      return 0
    fi

    log_warn "NVM_REINSTALL_FROM=$NVM_REINSTALL_FROM is not installed; installing without package copy."
    return 1
  fi

  if [[ "$QUIET" -eq 1 || "$DRY_RUN" -eq 1 || ! -t 0 ]]; then
    log_info "Installing $target_spec without copying global npm packages."
    return 1
  fi

  local -a sources=()
  while IFS= read -r major; do
    [[ -z "$major" ]] && continue
    [[ "$major" == "$target_spec" ]] && continue
    sources+=("$major")
  done < <(list_installed_majors)

  if ((${#sources[@]} == 0)); then
    log_info "No other installed majors to copy global npm packages from."
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
        log_info "Installing $target_spec without copying global npm packages."
        return 1
        ;;
      *)
        if source_version="$(installed_version "$choice")"; then
          log_action "Copying global packages from Node $choice ($source_version)"
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
  local prev_installed

  NVM_INSTALL_ARGS=(install "$spec")

  if prev_installed="$(installed_version "$spec")"; then
    NVM_INSTALL_ARGS+=(--reinstall-packages-from="$prev_installed")
  elif [[ "$EXPLICIT_VERSIONS" -eq 1 ]] && prompt_reinstall_from "$spec"; then
    NVM_INSTALL_ARGS+=(--reinstall-packages-from="$_NVM_REINSTALL_FROM")
  fi

  if [[ "$LATEST_NPM" -eq 1 ]]; then
    NVM_INSTALL_ARGS+=(--latest-npm)
  fi
}

restore_active_version() {
  local major

  if [[ "$ORIGINAL_NVM" == "none" || "$ORIGINAL_NVM" == "system" ]]; then
    if nvm alias default >/dev/null 2>&1; then
      log_action "Restoring nvm default…"
      run nvm use default >/dev/null
    fi
    return 0
  fi

  major="$(version_major "$ORIGINAL_NVM")"
  if installed_version "$major"; then
    log_action "Restoring Node.js $major…"
    run nvm use "$major" >/dev/null
  elif nvm alias default >/dev/null 2>&1; then
    log_info "Node.js $major not installed; using default"
    run nvm use default >/dev/null
  fi
}

# Result of the last process_one_version call: done | skipped | failed
_STEP_OUTCOME=""
_STEP_OUTCOME_DETAIL=""

# Process a single major. Sets _STEP_OUTCOME / _STEP_OUTCOME_DETAIL. Returns 0 unless failed.
process_one_version() {
  local version="$1"
  local remote="" installed=""

  _STEP_OUTCOME="done"
  _STEP_OUTCOME_DETAIL=""

  if remote="$(remote_version "$version")"; then
    if installed="$(installed_version "$version")"; then
      log_info "Installed: $installed"
      log_info "Latest:    $remote"
    else
      log_info "Not installed yet"
      log_info "Latest:    $remote"
    fi
  else
    log_warn "Could not resolve latest version for $version; continuing anyway."
    installed="$(installed_version "$version" || true)"
  fi

  if [[ "$NPM_ONLY" -eq 1 ]]; then
    if [[ -z "$installed" ]]; then
      log_warn "$version is not installed; skipping npm-only refresh."
      _STEP_OUTCOME="skipped"
      _STEP_OUTCOME_DETAIL="not installed"
      return 0
    fi

    log_skip "Leaving Node.js $installed in place"
    run nvm use "$version" >/dev/null
    refresh_npm_stack "$installed"
    PACKAGES_REFRESHED+=("$installed")
    if [[ "$PRUNE" -eq 1 ]]; then
      prune_old_patches "$version"
    fi
    log_ok "npm stack refreshed for $installed"
    _STEP_OUTCOME="done"
    _STEP_OUTCOME_DETAIL="$installed"
    return 0
  fi

  if [[ -n "$remote" && -n "$installed" && "$installed" == "$remote" && "$FORCE" -eq 0 ]]; then
    log_skip "Already current ($installed)"
    SKIPPED_VERSIONS+=("$installed")
    run nvm use "$version" >/dev/null
    refresh_npm_stack "$installed"
    if [[ "$SKIP_NPM" -eq 0 ]]; then
      PACKAGES_REFRESHED+=("$installed")
      log_ok "npm stack refreshed"
    fi
    if [[ "$PRUNE" -eq 1 ]]; then
      prune_old_patches "$version"
    fi
    _STEP_OUTCOME="skipped"
    _STEP_OUTCOME_DETAIL="$installed"
    return 0
  fi

  if [[ -n "$installed" ]]; then
    run nvm use "$version" >/dev/null
    update_global_packages "before Node update"
  else
    log_info "Fresh install"
  fi

  log_action "Installing latest Node.js $version…"
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
    log_ok "Updated to $(node -v) (npm $(npm -v))"
    UPDATED_VERSIONS+=("$(node -v)")
    _STEP_OUTCOME_DETAIL="$(node -v)"
  elif [[ -n "$remote" ]]; then
    log_ok "Would update to $remote"
    UPDATED_VERSIONS+=("$remote")
    _STEP_OUTCOME_DETAIL="$remote"
  else
    log_ok "Would update $version"
    UPDATED_VERSIONS+=("$version")
    _STEP_OUTCOME_DETAIL="$version"
  fi

  _STEP_OUTCOME="done"
  return 0
}

ORIGINAL_NVM="$(nvm current)"
UPDATED_VERSIONS=()
SKIPPED_VERSIONS=()
PACKAGES_REFRESHED=()
FAILED_VERSIONS=()
TOTAL_STEPS=${#VERSIONS[@]}
STEP_INDEX=0

for ((i = 0; i < TOTAL_STEPS; i++)); do
  STEP_STATE[i]=todo
  STEP_DETAIL[i]=""
done

enter_alt_screen
render_frame
if [[ "$PLAIN" -eq 1 ]]; then
  log_step "update-nvm ${SCRIPT_VERSION}"
fi
log_step "Ready"
log_info "Updating ${TOTAL_STEPS} version(s)"
echo

for version in "${VERSIONS[@]}"; do
  set_step_state "$STEP_INDEX" "doing"
  render_frame
  if [[ "$PLAIN" -eq 1 ]]; then
    log
    log_step "[$((STEP_INDEX + 1))/${TOTAL_STEPS}] Node.js ${version}"
  else
    log_step "Logs · Node.js ${version}"
  fi
  echo

  if process_one_version "$version"; then
    set_step_state "$STEP_INDEX" "$_STEP_OUTCOME" "$_STEP_OUTCOME_DETAIL"
  else
    _STEP_OUTCOME="failed"
    _STEP_OUTCOME_DETAIL="${_STEP_OUTCOME_DETAIL:-error}"
    set_step_state "$STEP_INDEX" "failed" "$_STEP_OUTCOME_DETAIL"
    FAILED_VERSIONS+=("$version")
    log_fail "Step failed for Node.js $version"
  fi

  STEP_INDEX=$((STEP_INDEX + 1))
done

render_frame
restore_active_version

# Leave alt screen before the lasting summary so results stay in scrollback.
leave_alt_screen

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
  if ((${#PACKAGES_REFRESHED[@]} > 0)); then
    if [[ -n "$summary" ]]; then
      summary+=", "
    fi
    summary+="packages ${PACKAGES_REFRESHED[*]}"
  fi
  if ((${#FAILED_VERSIONS[@]} > 0)); then
    if [[ -n "$summary" ]]; then
      summary+=", "
    fi
    summary+="failed ${FAILED_VERSIONS[*]}"
  fi
  if [[ -z "$summary" ]]; then
    summary="no changes"
  fi
  if [[ "$DRY_RUN" -eq 1 ]]; then
    summary="dry-run: $summary"
  fi
  echo "update-nvm: $summary"
else
  if [[ "$PLAIN" -eq 0 ]]; then
    print_banner
  fi
  print_progress_board
  echo
  log_step "Summary"
  echo
  if ((${#UPDATED_VERSIONS[@]} > 0)); then
    log_ok "Updated: ${UPDATED_VERSIONS[*]}"
  fi
  if ((${#SKIPPED_VERSIONS[@]} > 0)); then
    log_skip "Already current: ${SKIPPED_VERSIONS[*]}"
  fi
  if ((${#PACKAGES_REFRESHED[@]} > 0)); then
    log_ok "Globals refreshed: ${PACKAGES_REFRESHED[*]}"
  fi
  if ((${#FAILED_VERSIONS[@]} > 0)); then
    log_fail "Failed: ${FAILED_VERSIONS[*]}"
  fi
  if [[ "$DRY_RUN" -eq 0 ]]; then
    log_info "Active Node: $(node -v)"
    log_info "Active npm:  $(npm -v)"
  else
    log_info "Dry run complete; no changes were made."
  fi
  if ((${#FAILED_VERSIONS[@]} > 0)); then
    log_fail "Finished with errors."
  else
    log_ok "Done."
  fi
fi

notify_script_update

if ((${#FAILED_VERSIONS[@]} > 0)); then
  exit 1
fi

