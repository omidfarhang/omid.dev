#!/usr/bin/env bash
set -euo pipefail

# Bump when publishing changes to this script (used for self-update checks).
SCRIPT_VERSION="1.0.0"
SCRIPT_URL="${UPDATE_CURSOR_SCRIPT_URL:-https://omid.dev/scripts/update-cursor.sh}"

CURSOR_DIR="$HOME/.local/opt/cursor"
CURSOR_APPIMAGE="$CURSOR_DIR/cursor.AppImage"
CURSOR_ICON="$CURSOR_DIR/cursor.png"
DESKTOP_FILE="$HOME/.local/share/applications/cursor.desktop"
VERSION_FILE="$CURSOR_DIR/version.txt"
CURSOR_BIN="$HOME/.local/bin/cursor"
API_URL="https://www.cursor.com/api/download?platform=linux-x64&releaseTrack=stable"
FORCE=0
UNINSTALL=0
SELF_UPDATE=0

for arg in "$@"; do
  case "$arg" in
    --force|-f)
      FORCE=1
      ;;
    --uninstall|-u)
      UNINSTALL=1
      ;;
    --self-update)
      SELF_UPDATE=1
      ;;
    -h|--help)
      cat <<'HELP'
Usage: update-cursor [OPTIONS]

Install or update Cursor from the official stable API.
Skips download when the installed version is already the same or newer.

Options:
  --force, -f       Reinstall even when no update is needed
  --uninstall, -u   Remove Cursor, desktop entry, and this script
  --self-update     Download and install the latest update-cursor script from omid.dev
  -h, --help        Show this help

Environment:
  UPDATE_CURSOR_SCRIPT_URL        Override script URL for self-update (default: omid.dev)
  UPDATE_CURSOR_SKIP_SELF_CHECK   Set to 1 to skip the newer-script availability check
HELP
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      echo "Usage: update-cursor [--force|-f] [--uninstall|-u] [--self-update]" >&2
      exit 1
      ;;
  esac
done

json_value() {
  local json="$1"
  local key="$2"
  local value="${json#*\"$key\":\"}"

  if [[ "$value" == "$json" ]]; then
    return 1
  fi

  value="${value%%\"*}"
  printf '%s\n' "$value"
}

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
      echo "update-cursor ${SCRIPT_VERSION} is already up to date."
      exit 0
      ;;
    1)
      echo "Local update-cursor ${SCRIPT_VERSION} is newer than remote ${remote}."
      exit 0
      ;;
  esac

  script_path="$(readlink -f "${BASH_SOURCE[0]}")"
  tmp="$(mktemp)"
  trap 'rm -f "$tmp"' EXIT

  curl -fsSL "$SCRIPT_URL" -o "$tmp"
  new_version="$(script_version_from "$tmp")"
  if [[ -z "$new_version" || "$new_version" != "$remote" ]]; then
    echo "Downloaded script does not look like a valid update-cursor release." >&2
    exit 1
  fi

  chmod +x "$tmp"
  mv -f "$tmp" "$script_path"
  trap - EXIT

  echo "update-cursor updated to ${new_version}."
}

notify_script_update() {
  local remote cmp

  if [[ "${UPDATE_CURSOR_SKIP_SELF_CHECK:-0}" == 1 ]]; then
    return 0
  fi

  remote="$(remote_script_version)" || return 0
  [[ -z "$remote" ]] && return 0

  cmp=2
  version_compare "$SCRIPT_VERSION" "$remote" && cmp=0 || cmp=$?
  if [[ "$cmp" -eq 2 ]]; then
    echo "update-cursor $remote is available (installed: $SCRIPT_VERSION). Run: update-cursor --self-update" >&2
  fi
}

refresh_desktop_database() {
  if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database "$HOME/.local/share/applications" >/dev/null 2>&1 || true
  fi
}

uninstall_cursor() {
  local script_path

  script_path="$(readlink -f "${BASH_SOURCE[0]}")"

  echo "Removing Cursor..."

  rm -f "$CURSOR_BIN" "$DESKTOP_FILE"
  rm -rf "$CURSOR_DIR"
  refresh_desktop_database

  echo "Cursor has been uninstalled."

  rm -f "$script_path"
}

install_or_update_cursor() {
  if ! command -v curl >/dev/null 2>&1; then
    echo "curl is required. Install it with: sudo pacman -S curl" >&2
    exit 1
  fi

  mkdir -p "$CURSOR_DIR" "$HOME/.local/bin" "$HOME/.local/share/applications"

  echo "Checking latest Cursor stable release..."
  API_RESPONSE="$(curl --fail --silent --show-error --location "$API_URL")"

  if ! DOWNLOAD_URL="$(json_value "$API_RESPONSE" "downloadUrl")"; then
    echo "Cursor API did not return a downloadUrl." >&2
    exit 1
  fi

  CURSOR_VERSION="$(json_value "$API_RESPONSE" "version" || printf 'unknown')"
  INSTALLED_VERSION=""

  if [[ -f "$VERSION_FILE" ]]; then
    INSTALLED_VERSION="$(tr -d '[:space:]' < "$VERSION_FILE")"
  fi

  if [[ "$FORCE" -eq 0 && -n "$INSTALLED_VERSION" && "$INSTALLED_VERSION" != "unknown" && "$CURSOR_VERSION" != "unknown" ]]; then
    cmp=2
    version_compare "$INSTALLED_VERSION" "$CURSOR_VERSION" && cmp=0 || cmp=$?

    case "$cmp" in
      0)
        echo "Cursor ${INSTALLED_VERSION} is already up to date."
        return 0
        ;;
      1)
        echo "Cursor ${INSTALLED_VERSION} is newer than stable ${CURSOR_VERSION}. Skipping update."
        echo "Use update-cursor --force to reinstall anyway."
        return 0
        ;;
    esac
  fi

  TMP_DIR="$(mktemp -d)"
  TMP_APPIMAGE="$TMP_DIR/cursor.AppImage"

  cleanup() {
    rm -rf "$TMP_DIR"
  }
  trap cleanup EXIT

  echo "Downloading Cursor ${CURSOR_VERSION}..."
  curl --fail --location --show-error "$DOWNLOAD_URL" --output "$TMP_APPIMAGE"
  chmod +x "$TMP_APPIMAGE"

  echo "Extracting Cursor icon..."
  (
    cd "$TMP_DIR"
    "$TMP_APPIMAGE" --appimage-extract >/dev/null
  )
  install -m 644 \
    "$TMP_DIR/squashfs-root/usr/share/icons/hicolor/512x512/apps/cursor.png" \
    "$CURSOR_ICON"

  mv -f "$TMP_APPIMAGE" "$CURSOR_APPIMAGE"
  printf '%s\n' "$CURSOR_VERSION" > "$VERSION_FILE"
  ln -sfn "$CURSOR_APPIMAGE" "$CURSOR_BIN"

  cat > "$DESKTOP_FILE" <<DESKTOP
[Desktop Entry]
Name=Cursor
Exec=$CURSOR_APPIMAGE
Icon=$CURSOR_ICON
Type=Application
Categories=Development;
Terminal=false
StartupNotify=true
DESKTOP

  chmod +x "$DESKTOP_FILE"
  refresh_desktop_database

  echo "Cursor ${CURSOR_VERSION} has been installed or updated."
  echo "Run it with: cursor"
}

if [[ "$SELF_UPDATE" -eq 1 ]]; then
  self_update_script
elif [[ "$UNINSTALL" -eq 1 ]]; then
  uninstall_cursor
else
  install_or_update_cursor
  notify_script_update
fi
