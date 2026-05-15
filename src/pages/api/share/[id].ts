import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getShareRecord } from '@/lib/share';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const id = params.id ?? '';

  if (!id) {
    return Response.json({ error: '分享不存在。' }, { status: 404 });
  }

  const record = await getShareRecord((env as CloudflareEnv).DB, id);

  if (!record || record.invalidatedAt) {
    return Response.json({ error: '分享不存在，或者已经失效。' }, { status: 404 });
  }

  return Response.json({
    id: record.id,
    markdown: record.markdown,
    themeId: record.themeId,
  });
};
