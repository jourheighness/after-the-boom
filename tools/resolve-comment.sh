#!/usr/bin/env bash
# Resolve a comment by ID with a resolution message
# Usage: ./tools/resolve-comment.sh <comment-id> "<resolution text>"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
COMMENTS_FILE="$SCRIPT_DIR/comments.json"

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: resolve-comment.sh <comment-id> \"<resolution text>\""
  echo ""
  echo "  comment-id    Full ID or unique suffix (e.g. 'u4l' matches 'c_1771849112978_u4l')"
  echo "  resolution    What was changed to address the comment"
  exit 1
fi

ID_PATTERN="$1"
RESOLUTION="$2"
NOW="$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"

# Find matching comment
MATCH_COUNT=$(jq "[.comments[] | select(.id | endswith(\"$ID_PATTERN\"))] | length" "$COMMENTS_FILE")

if [ "$MATCH_COUNT" -eq 0 ]; then
  # Try exact match
  MATCH_COUNT=$(jq "[.comments[] | select(.id == \"$ID_PATTERN\")] | length" "$COMMENTS_FILE")
  if [ "$MATCH_COUNT" -eq 0 ]; then
    echo "No comment matching '$ID_PATTERN'"
    exit 1
  fi
  SELECTOR=".id == \"$ID_PATTERN\""
elif [ "$MATCH_COUNT" -gt 1 ]; then
  echo "Ambiguous: $MATCH_COUNT comments match '$ID_PATTERN'"
  jq -r ".comments[] | select(.id | endswith(\"$ID_PATTERN\")) | \"  \(.id)  \(.status)  \(.comment[0:50])\"" "$COMMENTS_FILE"
  exit 1
else
  SELECTOR="(.id | endswith(\"$ID_PATTERN\"))"
fi

# Update the comment
jq --arg res "$RESOLUTION" --arg now "$NOW" \
  "(.comments[] | select($SELECTOR)) |= (.status = \"resolved\" | .resolution = \$res | .resolvedAt = \$now)" \
  "$COMMENTS_FILE" > "$COMMENTS_FILE.tmp" && mv "$COMMENTS_FILE.tmp" "$COMMENTS_FILE"

# Show result
FULL_ID=$(jq -r ".comments[] | select($SELECTOR) | .id" "$COMMENTS_FILE")
echo "Resolved: $FULL_ID"
echo "Resolution: $RESOLUTION"
