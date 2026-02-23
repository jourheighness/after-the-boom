#!/usr/bin/env bash
# List open comments from comments.json with file:line and context
# Usage: ./tools/list-comments.sh [--all]

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMMENTS_FILE="$SCRIPT_DIR/comments.json"

if [ ! -f "$COMMENTS_FILE" ]; then
  echo "No comments.json found at $COMMENTS_FILE"
  exit 1
fi

FILTER='.comments[] | select(.status == "open")'
if [ "$1" = "--all" ]; then
  FILTER='.comments[] | select(.status != "dismissed")'
fi

jq -r "$FILTER"' |
  "\(.id)  \(.filePath // .sourceFile):\(.sourceLine // .nearestHeadingLine // "?")  \"\(.selectedText[0:60])\"  → \(.comment)"
' "$COMMENTS_FILE"
