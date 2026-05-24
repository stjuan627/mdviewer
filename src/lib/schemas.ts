import { z } from 'zod';
import { MAX_MARKDOWN_LENGTH, MAX_URL_PAYLOAD_LENGTH } from '@/lib/constants';
import { homeInitialMarkdown } from '@/lib/landing-pages/content/home';
import { DEFAULT_LOCALE, localeSchema } from '@/lib/i18n';
import { DEFAULT_THEME_ID, THEME_IDS } from '@/lib/themes';

export const renderRequestSchema = z.object({
  markdown: z.string().trim().min(1).max(MAX_MARKDOWN_LENGTH),
});

export const themeIdSchema = z.enum(THEME_IDS);

export const createShareSchema = renderRequestSchema.extend({
  themeId: themeIdSchema.default(DEFAULT_THEME_ID),
});

export const pdfRequestSchema = renderRequestSchema.extend({
  themeId: themeIdSchema.default(DEFAULT_THEME_ID),
  locale: localeSchema.default(DEFAULT_LOCALE),
});

export type WorkbenchInit = {
  markdown: string;
  source: string | null;
  payloadDropped: boolean;
  shareId: string | null;
  themeId: z.infer<typeof themeIdSchema>;
};

export function normalizeMarkdown(markdown: string) {
  return markdown.replace(/\r\n/g, '\n').trim();
}

export function parseWorkbenchSearchParams(
  searchParams: URLSearchParams,
  fallbackMarkdownInput = homeInitialMarkdown
): WorkbenchInit {
  const rawPayload = searchParams.get('payload');
  const source = searchParams.get('source');
  const shareId = searchParams.get('shareId');
  const rawThemeId = searchParams.get('theme');
  const parsedThemeId = themeIdSchema.safeParse(rawThemeId);
  const themeId = parsedThemeId.success ? parsedThemeId.data : DEFAULT_THEME_ID;
  const fallbackMarkdown = fallbackMarkdownInput;

  if (!rawPayload) {
    return {
      markdown: fallbackMarkdown,
      source,
      payloadDropped: false,
      shareId,
      themeId,
    };
  }

  if (rawPayload.length > MAX_URL_PAYLOAD_LENGTH) {
    return {
      markdown: fallbackMarkdown,
      source,
      payloadDropped: true,
      shareId,
      themeId,
    };
  }

  const payloadResult = z.string().trim().min(1).max(MAX_MARKDOWN_LENGTH).safeParse(rawPayload);

  if (!payloadResult.success) {
    return {
      markdown: fallbackMarkdown,
      source,
      payloadDropped: true,
      shareId,
      themeId,
    };
  }

  return {
    markdown: normalizeMarkdown(payloadResult.data),
    source,
    payloadDropped: false,
    shareId,
    themeId,
  };
}
