import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { parsePdfRequestPayload, requestQuickActionPdf } from '@/lib/quick-action-pdf';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await parsePdfRequestPayload(request);
    const response = await requestQuickActionPdf(payload, env as CloudflareEnv);

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json(
        {
          error: 'Quick Action PDF export failed.',
          details: errorText,
        },
        { status: response.status }
      );
    }

    const pdf = await response.arrayBuffer();
    const headers = new Headers();
    headers.set('content-type', response.headers.get('content-type') ?? 'application/pdf');
    headers.set(
      'content-disposition',
      response.headers.get('content-disposition') ?? 'attachment; filename="mdviewer-export-quick-action.pdf"'
    );

    const browserMsUsed = response.headers.get('x-browser-ms-used');

    if (browserMsUsed) {
      headers.set('x-browser-ms-used', browserMsUsed);
    }

    return new Response(pdf, { headers });
  } catch (error) {
    console.error(error);

    const message = error instanceof Error ? error.message : 'Quick Action PDF export failed.';
    const status = message === 'Quick Action PDF is not configured.' ? 501 : 500;

    return Response.json({ error: message }, { status });
  }
};
