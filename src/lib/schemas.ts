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

export const MARKDOWN_TABLE_LIMITS = {
  maxColumns: 20,
  maxRows: 100,
  maxCellLength: 2_000,
} as const;

export const HTML_TO_MARKDOWN_LIMITS = {
  maxInputLength: 200_000,
  maxFileBytes: 200 * 1024,
} as const;

export const htmlConversionInputSchema = z.object({
  html: z
    .string()
    .trim()
    .min(1, 'Paste HTML or open an HTML file before converting.')
    .max(
      HTML_TO_MARKDOWN_LIMITS.maxInputLength,
      'HTML input can contain up to 200,000 characters.'
    ),
});

export const markdownTableAlignmentSchema = z.enum(['left', 'center', 'right']);

export const markdownTableModelSchema = z
  .object({
    rows: z
      .array(
        z.array(z.string().max(MARKDOWN_TABLE_LIMITS.maxCellLength, 'Each cell can contain up to 2,000 characters.'))
      )
      .min(2, 'A table needs a header row and at least one body row.')
      .max(MARKDOWN_TABLE_LIMITS.maxRows, 'A table can contain up to 100 rows.'),
    alignments: z
      .array(markdownTableAlignmentSchema)
      .min(1, 'A table needs at least one column.')
      .max(MARKDOWN_TABLE_LIMITS.maxColumns, 'A table can contain up to 20 columns.'),
  })
  .superRefine((model, context) => {
    const columnCount = model.alignments.length;

    model.rows.forEach((row, rowIndex) => {
      if (row.length !== columnCount) {
        context.addIssue({
          code: 'custom',
          message: `Row ${rowIndex + 1} must contain exactly ${columnCount} cells.`,
          path: ['rows', rowIndex],
        });
      }
    });
  });

export type MarkdownTableAlignment = z.infer<typeof markdownTableAlignmentSchema>;
export type MarkdownTableModel = z.infer<typeof markdownTableModelSchema>;

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
