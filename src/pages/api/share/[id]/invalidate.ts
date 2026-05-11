import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return Response.json({ error: '缺少分享 ID。' }, { status: 400 });
  }

  try {
    await (env as CloudflareEnv).DB.prepare(
      'UPDATE share_records SET invalidated_at = ?1 WHERE id = ?2 AND invalidated_at IS NULL',
    )
      .bind(new Date().toISOString(), id)
      .run();

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: '失效分享失败。' }, { status: 500 });
  }
};
