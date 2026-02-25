import type { AstroIntegration } from 'astro';
import type { ViteDevServer, Plugin as VitePlugin } from 'vite';
import { resolve } from 'node:path';

// Lazily import DB functions to avoid loading native modules during build
async function loadDb(dbPath: string) {
  const { openDb, getComments, getComment, upsertComment, updateStatus, deleteComment, toComment } =
    await import('../../../tools/comments-server/src/db.ts');
  return { db: openDb(dbPath), getComments, getComment, upsertComment, updateStatus, deleteComment, toComment };
}

type SSEClient = {
  id: number;
  res: {
    write: (data: string) => boolean;
    end: () => void;
  };
};

export default function commentsIntegration(): AstroIntegration {
  return {
    name: 'comments',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        const vitePlugin: VitePlugin = {
          name: 'comments-api',
          configureServer(server: ViteDevServer) {
            const dbPath = resolve(process.cwd(), '..', 'tools', 'comments.db');
            let dbModule: Awaited<ReturnType<typeof loadDb>> | null = null;
            const clients: SSEClient[] = [];
            let clientId = 0;

            async function getDb() {
              if (!dbModule) {
                dbModule = await loadDb(dbPath);
              }
              return dbModule;
            }

            function broadcast(event: Record<string, unknown>) {
              const data = `event: update\ndata: ${JSON.stringify(event)}\n\n`;
              for (let i = clients.length - 1; i >= 0; i--) {
                try {
                  clients[i].res.write(data);
                } catch {
                  clients.splice(i, 1);
                }
              }
            }

            // Make broadcast available for the watcher (via global)
            (globalThis as Record<string, unknown>).__commentsBroadcast = broadcast;
            (globalThis as Record<string, unknown>).__commentsGetDb = getDb;

            // Start file watcher with optional indexer
            getDb().then(async ({ db: database }) => {
              try {
                const { startWatcher } = await import('../../../tools/comments-server/src/watcher.ts');
                const { indexFile } = await import('../../../tools/comments-server/src/indexer.ts');
                const indexer = {
                  indexFile: (db: typeof database, relPath: string, content: string) =>
                    indexFile(db, relPath, content).then(() => {}),
                };
                startWatcher(database, resolve(process.cwd(), '..'), broadcast, indexer);
              } catch (err) {
                console.warn('[comments] File watcher failed to start:', err);
              }
            });

            server.middlewares.use(async (req, res, next) => {
              const url = new URL(req.url || '/', `http://${req.headers.host}`);

              if (!url.pathname.startsWith('/api/comments')) {
                return next();
              }

              // CORS
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

              if (req.method === 'OPTIONS') {
                res.statusCode = 204;
                res.end();
                return;
              }

              try {
                const { db, getComments, getComment, upsertComment, updateStatus, deleteComment, toComment } = await getDb();

                // SSE endpoint
                if (url.pathname === '/api/comments/stream' && req.method === 'GET') {
                  res.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                  });
                  res.write('event: connected\ndata: {}\n\n');

                  const id = clientId++;
                  clients.push({ id, res: res as SSEClient['res'] });

                  req.on('close', () => {
                    const idx = clients.findIndex((c) => c.id === id);
                    if (idx !== -1) clients.splice(idx, 1);
                  });
                  return; // Keep connection open
                }

                // GET /api/comments
                if (url.pathname === '/api/comments' && req.method === 'GET') {
                  const status = url.searchParams.get('status') || undefined;
                  const comments = getComments(db, { status });
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(comments));
                  return;
                }

                // POST /api/comments — upsert single comment
                if (url.pathname === '/api/comments' && req.method === 'POST') {
                  const body = await readBody(req);
                  const data = JSON.parse(body);

                  // Support both single comment and bulk format
                  if (Array.isArray(data)) {
                    // Bulk: array of comments
                    for (const c of data) {
                      upsertComment(db, normalizeComment(c, toComment));
                    }
                    broadcast({ type: 'bulk_update' });
                  } else if (data.comments) {
                    // Legacy format: { version, comments: [...] }
                    for (const c of data.comments) {
                      upsertComment(db, normalizeComment(c, toComment));
                    }
                    broadcast({ type: 'bulk_update' });
                  } else {
                    // Single comment
                    upsertComment(db, normalizeComment(data, toComment));
                    broadcast({ type: 'upsert', comment: data });
                  }

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ ok: true }));
                  return;
                }

                // POST /api/comments/bulk — upsert array
                if (url.pathname === '/api/comments/bulk' && req.method === 'POST') {
                  const body = await readBody(req);
                  const arr = JSON.parse(body);
                  if (Array.isArray(arr)) {
                    for (const c of arr) {
                      upsertComment(db, normalizeComment(c, toComment));
                    }
                  }
                  broadcast({ type: 'bulk_update' });
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ ok: true }));
                  return;
                }

                // PATCH /api/comments/:id
                const patchMatch = url.pathname.match(/^\/api\/comments\/(.+)$/);
                if (patchMatch && req.method === 'PATCH') {
                  const body = await readBody(req);
                  const { status, resolution, resolved_text } = JSON.parse(body);
                  try {
                    updateStatus(db, decodeURIComponent(patchMatch[1]), status, resolution, resolved_text);
                    const updated = getComment(db, decodeURIComponent(patchMatch[1]));
                    broadcast({ type: 'status_change', comment: updated });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(updated));
                  } catch (e: unknown) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: (e as Error).message }));
                  }
                  return;
                }

                // DELETE /api/comments/:id
                const deleteMatch = url.pathname.match(/^\/api\/comments\/(.+)$/);
                if (deleteMatch && req.method === 'DELETE') {
                  const ok = deleteComment(db, decodeURIComponent(deleteMatch[1]));
                  if (ok) {
                    broadcast({ type: 'delete', id: decodeURIComponent(deleteMatch[1]) });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ ok: true }));
                  } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'not found' }));
                  }
                  return;
                }

                next();
              } catch (e: unknown) {
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

/** Convert frontend camelCase comment to DB Comment format */
function normalizeComment(raw: Record<string, unknown>, toComment: Function) {
  // If it already has snake_case fields, pass through
  if ('selected_text' in raw) return raw;

  // Convert from frontend camelCase format
  return {
    id: raw.id as string,
    selectedText: raw.selectedText as string,
    contextBefore: (raw.contextBefore as string) || '',
    contextAfter: (raw.contextAfter as string) || '',
    comment: raw.comment as string,
    sectionId: raw.sectionId as string,
    sourceFile: raw.sourceFile as string,
    filePath: raw.filePath as string | null,
    nearestHeadingLine: raw.nearestHeadingLine as number | null,
    sourceLine: raw.sourceLine as number | null,
    paragraphIndex: raw.paragraphIndex as number | null,
    status: raw.status as string,
    resolution: raw.resolution as string | null,
    resolvedText: raw.resolvedText as string | null,
    resolvedAt: raw.resolvedAt as string | null,
    createdAt: raw.createdAt as string,
    orphaned: raw._orphaned ? 1 : 0,
  };
}
