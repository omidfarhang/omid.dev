#!/usr/bin/env bash
set -euo pipefail

CURSOR_DIR="$HOME/.local/opt/cursor"
CURSOR_APPIMAGE="$CURSOR_DIR/cursor.AppImage"
CURSOR_ICON="$CURSOR_DIR/cursor.png"
DESKTOP_FILE="$HOME/.local/share/applications/cursor.desktop"
VERSION_FILE="$CURSOR_DIR/version.txt"
CURSOR_BIN="$HOME/.local/bin/cursor"
API_URL="https://www.cursor.com/api/download?platform=linux-x64&releaseTrack=stable"
FORCE=0
UNINSTALL=0

for arg in "$@"; do
  case "$arg" in
    --force|-f)
      FORCE=1
      ;;
    --uninstall|-u)
      UNINSTALL=1
      ;;
    -h|--help)
      cat <<'HELP'
Usage: update-cursor [OPTIONS]

Install or update Cursor from the official stable API.
Skips download when the installed version is already the same or newer.

Options:
  --force, -f       Reinstall even when no update is needed
  --uninstall, -u   Remove Cursor, desktop entry, and this script
  -h, --help        Show this help
HELP
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      echo "Usage: update-cursor [--force|-f] [--uninstall|-u]" >&2
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
        exit 0
        ;;
      1)
        echo "Cursor ${INSTALLED_VERSION} is newer than stable ${CURSOR_VERSION}. Skipping update."
        echo "Use update-cursor --force to reinstall anyway."
        exit 0
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

if [[ "$UNINSTALL" -eq 1 ]]; then
  uninstall_cursor
else
  install_or_update_cursor
fi
