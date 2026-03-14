#!/usr/bin/env bash
# Sync foundry-system/mondas/ → Foundry data dir on file change.
# Run in a spare terminal tab during development.

SRC="$(cd "$(dirname "$0")" && pwd)/foundry-system/mondas"

# Set your Foundry data path here, or export FOUNDRY_DATA before running
FOUNDRY_DATA="${FOUNDRY_DATA:-$HOME/Library/Application Support/FoundryVTT/Data}"
DEST="$FOUNDRY_DATA/systems/mondas"

if ! command -v fswatch &>/dev/null; then
  echo "fswatch not found — brew install fswatch"
  exit 1
fi

echo "Watching: $SRC"
echo "Syncing → $DEST"
echo "Press Ctrl-C to stop."
echo ""

# Initial sync
rsync -a --delete "$SRC/" "$DEST/"
echo "$(date +%H:%M:%S) initial sync done"

# Watch for changes, sync individual files
fswatch -0 -r "$SRC" | while IFS= read -r -d '' file; do
  rel="${file#$SRC/}"
  if [ -f "$file" ]; then
    cp "$file" "$DEST/$rel"
    echo "$(date +%H:%M:%S) → $rel"
  elif [ ! -e "$file" ]; then
    rm -f "$DEST/$rel"
    echo "$(date +%H:%M:%S) ✕ $rel"
  fi
done
