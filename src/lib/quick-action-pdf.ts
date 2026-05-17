import { buildServerPdfDocument } from '@/lib/server-pdf';
import { createShareSchema, normalizeMarkdown } from '@/lib/schemas';
import type { ThemeId } from '@/lib/themes';

const QUICK_ACTION_ENDPOINT = 'https://api.cloudflare.com/client/v4/accounts';

type QuickActionPayload = {
  markdown: string;
  themeId: ThemeId;
};

export async function parsePdfRequestPayload(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json')
    ? await request.json()
    : Object.fromEntries((await request.formData()).entries());
  const result = createShareSchema.safeParse(payload);

  if (!result.success) {
    throw new Error('Invalid PDF export payload.');
  }

  return {
    markdown: normalizeMarkdown(result.data.markdown),
    themeId: result.data.themeId,
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
