import type { AstroIntegration } from 'astro';
import type { ViteDevServer, Plugin as VitePlugin } from 'vite';
import { resolve } from 'node:path';
import { realpath, writeFile, readdir, readFile } from 'node:fs/promises';
import { contentHash } from '../lib/editor/content-hash';
import { mergeDiff3 } from 'node-diff3';

const ALLOWED_COLLECTIONS = ['rules', 'campaigns', 'research', 'dm-screen'];

function stripFrontmatter(raw: string): { frontmatter: string; body: string } {
  const m = raw.match(/^---\n[\s\S]*?\n---\n/);
  return { frontmatter: m ? m[0] : '', body: m ? raw.slice(m[0].length) : raw };
}

// Files written by the editor — HMR should be suppressed for these
const recentlyWritten = new Set<string>();

export default function editorIntegration(): AstroIntegration {
  return {
    name: 'editor',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        const vitePlugin: VitePlugin = {
          name: 'editor-save-api',

          // Suppress HMR for all .md content files — they're data, not code.
          // Our saves are handled by the editor. External changes are detected on window focus.
          handleHotUpdate({ file }) {
            if (file.endsWith('.md')) {
              // Don't remove from recentlyWritten here — the ws.send interceptor
              // needs it to block the content layer's full-reload, which arrives later.
              // The 5-second timeout handles cleanup.
              console.log(`[editor] Suppressed HMR for ${file}`);
              return [];
            }
          },

          configureServer(server: ViteDevServer) {
            // Intercept ws.send to suppress full-reload messages triggered by our saves.
            // Astro's content layer calls server.ws.send({ type: 'full-reload' }) when
            // the data store changes after a .md file write. We block these when the
            // write came from the editor (tracked in recentlyWritten).
            const origWsSend = server.ws.send.bind(server.ws);
            server.ws.send = (...args: any[]) => {
              const msg = args[0];
              if (msg && typeof msg === 'object' && msg.type === 'full-reload' && recentlyWritten.size > 0) {
                console.log('[editor] Blocked full-reload from content layer');
                return;
              }
              return origWsSend(...args);
            };

            server.middlewares.use(async (req, res, next) => {
              const url = new URL(req.url || '/', `http://${req.headers.host}`);

              if (!url.pathname.startsWith('/api/editor/')) return next();

              // GET /api/editor/read?collection=X&entry=Y — read current file from disk
              if (url.pathname === '/api/editor/read' && req.method === 'GET') {
                try {
                  const collection = url.searchParams.get('collection');
                  const entry = url.searchParams.get('entry');
                  if (!collection || !entry) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing collection or entry' }));
                    return;
                  }
                  const contentDir = resolve(process.cwd(), 'src', 'content', collection);
                  const files = await readdir(contentDir);
                  const match = files.find(f => f.toLowerCase().replace(/\.md$/, '') === entry.toLowerCase());
                  if (!match) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Not found' }));
                    return;
                  }
                  const realFile = await realpath(resolve(contentDir, match));
                  const raw = await readFile(realFile, 'utf-8');
                  const { body } = stripFrontmatter(raw);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ content: body, hash: contentHash(body) }));
                } catch (e: unknown) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: (e as Error).message }));
                }
                return;
              }

              if (url.pathname !== '/api/editor/save') return next();

              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

              if (req.method === 'OPTIONS') {
                res.statusCode = 204;
                res.end();
                return;
              }

              if (req.method !== 'POST') return next();

              try {
                const reqBody = await readBody(req);
                const { collection, entry, content, expectedHash, baseContent } = JSON.parse(reqBody);

                if (!collection || !entry || typeof content !== 'string') {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Missing collection, entry, or content' }));
                  return;
                }

                if (!ALLOWED_COLLECTIONS.includes(collection)) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: `Invalid collection: ${collection}` }));
                  return;
                }

                // Find the actual file (Astro lowercases entry IDs and strips .md)
                const contentDir = resolve(process.cwd(), 'src', 'content', collection);
                const files = await readdir(contentDir);
                const match = files.find(f => f.toLowerCase().replace(/\.md$/, '') === entry.toLowerCase());
                if (!match) {
                  res.writeHead(404, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: `File not found for entry: ${entry}` }));
                  return;
                }

                const symlink = resolve(contentDir, match);
                const realFile = await realpath(symlink);

                // Read current file, separate frontmatter from body
                const existing = await readFile(realFile, 'utf-8');
                const { frontmatter, body: diskBody } = stripFrontmatter(existing);
                const diskHash = contentHash(diskBody);

                // ── Compare-and-swap: detect external changes ──
                let contentToWrite = content;
                let merged = false;

                if (expectedHash && expectedHash !== diskHash) {
                  // Disk changed since client's last read/save
                  if (baseContent) {
                    // Three-way merge: base (last known), ours (editor), theirs (disk)
                    const result = mergeDiff3(
                      content.split('\n'),
                      baseContent.split('\n'),
                      diskBody.split('\n'),
                    );
                    if (result.conflict) {
                      // Real conflict — overlapping edits
                      console.log(`[editor] Conflict in ${collection}/${entry}`);
                      res.writeHead(409, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({
                        error: 'conflict',
                        diskContent: diskBody,
                        diskHash,
                      }));
                      return;
                    }
                    // Clean merge — non-overlapping changes
                    contentToWrite = result.result.join('\n');
                    merged = true;
                    console.log(`[editor] Auto-merged ${collection}/${entry}`);
                  } else {
                    // No base content → can't merge, report conflict
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      error: 'conflict',
                      diskContent: diskBody,
                      diskHash,
                    }));
                    return;
                  }
                }

                // ── Write ──
                // Mark paths so handleHotUpdate suppresses reload
                recentlyWritten.add(realFile);
                recentlyWritten.add(symlink);
                setTimeout(() => {
                  recentlyWritten.delete(realFile);
                  recentlyWritten.delete(symlink);
                }, 5000);

                await writeFile(realFile, frontmatter + contentToWrite, 'utf-8');
                const newHash = contentHash(contentToWrite);

                console.log(`[editor] Saved ${collection}/${entry}${merged ? ' (merged)' : ''} → ${realFile}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  ok: true,
                  path: realFile,
                  hash: newHash,
                  ...(merged ? { merged: true, content: contentToWrite } : {}),
                }));
              } catch (e: unknown) {
                console.error('[editor] Save error:', e);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: (e as Error).message }));
              }
            });
          },
        };

        updateConfig({ vite: { plugins: [vitePlugin] } });
      },
    },
  };
}

function readBody(req: { on: (event: string, cb: (data?: Buffer) => void) => void }): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk?: Buffer) => { if (chunk) chunks.push(chunk); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}
