import { buildServerPdfDocument } from '@/lib/server-pdf';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/components/i18n/I18nProvider';
import { DEFAULT_LOCALE, localeSchema } from '@/lib/i18n';
import { normalizeMarkdown, pdfRequestSchema } from '@/lib/schemas';
import type { ThemeId } from '@/lib/themes';

const QUICK_ACTION_ENDPOINT = 'https://api.cloudflare.com/client/v4/accounts';

type QuickActionPayload = {
  markdown: string;
  themeId: ThemeId;
  locale: Locale;
};

export async function parsePdfRequestPayload(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json')
    ? await request.json()
    : Object.fromEntries((await request.formData()).entries());
  const locale = localeSchema.safeParse(payload.locale).success
    ? localeSchema.parse(payload.locale)
    : DEFAULT_LOCALE;
  const result = pdfRequestSchema.safeParse(payload);

  if (!result.success) {
    throw new Error(getTranslation(locale, 'api.pdf.invalidPayload'));
  }

  return {
    markdown: normalizeMarkdown(result.data.markdown),
    themeId: result.data.themeId,
    locale: result.data.locale,
  };
}

export async function requestQuickActionPdf(
  input: QuickActionPayload,
  env: CloudflareEnv
) {
  const apiToken = env.CF_BROWSER_RUN_API_TOKEN;
  const accountId = env.CF_ACCOUNT_ID;

  if (!apiToken || !accountId) {
    throw new Error('Quick Action PDF is not configured.');
  }

  const html = buildServerPdfDocument(input.markdown, input.themeId);
  const response = await fetch(`${QUICK_ACTION_ENDPOINT}/${accountId}/browser-rendering/pdf`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ html }),
  });

  return response;
}
