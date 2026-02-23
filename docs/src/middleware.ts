import type { MiddlewareHandler } from 'astro';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const COMMENTS_FILE = resolve(process.cwd(), '..', 'tools', 'comments.json');

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);

  // Only handle /api/comments in dev mode
  if (!url.pathname.endsWith('/api/comments')) {
    return next();
  }

  if (context.request.method === 'GET') {
    let data: any = { version: 1, comments: [] };
    if (existsSync(COMMENTS_FILE)) {
      try {
        data = JSON.parse(readFileSync(COMMENTS_FILE, 'utf-8'));
      } catch { /* empty */ }
    }
    return new Response(JSON.stringify(data.comments || []), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  if (context.request.method === 'POST') {
    try {
      const body = await context.request.json();
      const out = {
        version: 1,
        comments: Array.isArray(body) ? body : (body.comments || []),
      };
      writeFileSync(COMMENTS_FILE, JSON.stringify(out, null, 2), 'utf-8');
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  return next();
};
