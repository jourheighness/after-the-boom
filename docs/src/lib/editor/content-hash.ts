/**
 * Fast non-cryptographic hash for content comparison.
 * Used by both server (save endpoint) and client (editor state)
 * to detect external file changes. djb2 algorithm.
 */
export function contentHash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}
