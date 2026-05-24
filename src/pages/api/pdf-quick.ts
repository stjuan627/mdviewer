import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { getTranslation } from '@/components/i18n/I18nProvider';
import { parsePdfRequestPayload, requestQuickActionPdf } from '@/lib/quick-action-pdf';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let locale = DEFAULT_LOCALE;

  try {
    const payload = await parsePdfRequestPayload(request);
    locale = payload.locale;
    const response = await requestQuickActionPdf(payload, env as CloudflareEnv);

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json(
        {
          error: getTranslation(locale, 'api.pdf.failed'),
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

    const rawMessage = error instanceof Error ? error.message : getTranslation(locale, 'api.pdf.failed');
    const status =
      rawMessage === getTranslation(locale, 'api.pdf.notConfigured') ||
      rawMessage === 'Quick Action PDF is not configured.'
        ? 501
        : 500;
    const message =
      rawMessage === 'Quick Action PDF is not configured.'
        ? getTranslation(locale, 'api.pdf.notConfigured')
        : rawMessage;

    return Response.json({ error: message }, { status });
  }
};
