#!/usr/bin/env bash
# Link the mondas system from this repo into Foundry VTT's data directory.
# Run once per machine. Idempotent — safe to re-run.
#
# Usage:
#   ./link-system.sh                    # auto-detect Foundry data path
#   ./link-system.sh /path/to/FoundryVTT/Data   # explicit path

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SYSTEM_SRC="$SCRIPT_DIR/mondas"

# Resolve Foundry data path
if [[ -n "${1:-}" ]]; then
  FOUNDRY_DATA="$1"
elif [[ -d "$HOME/Library/Application Support/FoundryVTT/Data" ]]; then
  FOUNDRY_DATA="$HOME/Library/Application Support/FoundryVTT/Data"
elif [[ -d "$HOME/.local/share/FoundryVTT/Data" ]]; then
  FOUNDRY_DATA="$HOME/.local/share/FoundryVTT/Data"
elif [[ -d "${LOCALAPPDATA:-}/FoundryVTT/Data" ]]; then
  FOUNDRY_DATA="${LOCALAPPDATA}/FoundryVTT/Data"
else
  echo "Could not auto-detect Foundry data path."
  echo "Usage: $0 /path/to/FoundryVTT/Data"
  exit 1
fi

TARGET="$FOUNDRY_DATA/systems/mondas"

# Already linked correctly?
if [[ -L "$TARGET" ]]; then
  EXISTING="$(readlink "$TARGET")"
  if [[ "$EXISTING" == "$SYSTEM_SRC" ]]; then
    echo "Already linked: $TARGET -> $SYSTEM_SRC"
    exit 0
  fi
  echo "Removing stale symlink: $TARGET -> $EXISTING"
  rm "$TARGET"
fi

# Real directory exists — back it up
if [[ -d "$TARGET" ]]; then
  BACKUP="${TARGET}.bak.$(date +%s)"
  echo "Backing up existing dir: $TARGET -> $BACKUP"
  mv "$TARGET" "$BACKUP"
fi

mkdir -p "$(dirname "$TARGET")"
ln -s "$SYSTEM_SRC" "$TARGET"
echo "Linked: $TARGET -> $SYSTEM_SRC"
echo "Restart Foundry to pick up changes."
