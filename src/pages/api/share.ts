import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { randomUUID } from 'node:crypto';
import { createShareSchema, normalizeMarkdown } from '@/lib/schemas';
import { buildShareRecord, insertShareRecord } from '@/lib/share';

export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const json = await request.json();
    const result = createShareSchema.safeParse(json);

    if (!result.success) {
      return Response.json({ error: '输入不合法。' }, { status: 400 });
    }

    const markdown = normalizeMarkdown(result.data.markdown);
    const id = randomUUID().slice(0, 8);

    await insertShareRecord(
      (env as CloudflareEnv).DB,
      buildShareRecord({
        id,
        markdown,
      }),
    );

    const shareUrl = new URL(`/share/${id}`, url).toString();
    return Response.json({ id, shareUrl });
  } catch {
    return Response.json({ error: '分享创建失败，请稍后重试。' }, { status: 500 });
  }
};
