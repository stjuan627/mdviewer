import type { APIRoute } from 'astro';
import puppeteer from '@cloudflare/puppeteer';
import { env } from 'cloudflare:workers';
import { buildServerPdfDocument, estimateBrowserRunCostUsd } from '@/lib/server-pdf';
import { parsePdfRequestPayload } from '@/lib/quick-action-pdf';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const browserBinding = (env as CloudflareEnv).BROWSER;

  if (!browserBinding) {
    return Response.json({ error: 'Browser Run binding is not configured.' }, { status: 501 });
  }

  try {
    const { markdown, themeId } = await parsePdfRequestPayload(request);
    const documentHtml = buildServerPdfDocument(markdown, themeId);
    const startedAt = performance.now();

    const browser = await puppeteer.launch(browserBinding);

    try {
      const page = await browser.newPage();
      await page.setContent(documentHtml, { waitUntil: 'load' });
      await page.emulateMediaType('screen');

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
      });

      const browserMsUsed = Math.round(performance.now() - startedAt);
      const estimatedCostUsd = estimateBrowserRunCostUsd(browserMsUsed);

      return new Response(pdf as BodyInit, {
        headers: {
          'content-type': 'application/pdf',
          'content-disposition': 'attachment; filename="mdviewer-export-server.pdf"',
          'x-browser-ms-used-estimate': String(browserMsUsed),
          'x-browser-run-cost-usd-estimate': estimatedCostUsd.toFixed(8),
        },
      });
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Server PDF export failed.' }, { status: 500 });
  }
};
