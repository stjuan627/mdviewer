import type { APIRoute } from 'astro';
import puppeteer from '@cloudflare/puppeteer';
import { env } from 'cloudflare:workers';
import { buildServerPdfDocument, estimateBrowserRunCostUsd } from '@/lib/server-pdf';
import { createShareSchema, normalizeMarkdown } from '@/lib/schemas';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!env.BROWSER) {
    return Response.json({ error: 'Browser Run binding is not configured.' }, { status: 501 });
  }

  try {
    const json = await request.json();
    const result = createShareSchema.safeParse(json);

    if (!result.success) {
      return Response.json({ error: 'Invalid PDF export payload.' }, { status: 400 });
    }

    const markdown = normalizeMarkdown(result.data.markdown);
    const themeId = result.data.themeId;
    const documentHtml = buildServerPdfDocument(markdown, themeId);
    const startedAt = performance.now();

    const browser = await puppeteer.launch(env.BROWSER);

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
      const pdfBytes = pdf instanceof Uint8Array ? pdf : new Uint8Array(pdf);

      return new Response(pdfBytes, {
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
