import { z } from 'zod';
import { MAX_MARKDOWN_LENGTH, MAX_URL_PAYLOAD_LENGTH } from '@/lib/constants';
import { defaultMarkdown } from '@/lib/sample-markdown';

export const renderRequestSchema = z.object({
  markdown: z.string().trim().min(1).max(MAX_MARKDOWN_LENGTH),
});

export const createShareSchema = renderRequestSchema;

export type WorkbenchInit = {
  markdown: string;
  source: string | null;
  payloadDropped: boolean;
  shareId: string | null;
};

export function normalizeMarkdown(markdown: string) {
  return markdown.replace(/\r\n/g, '\n').trim();
}

export function parseWorkbenchSearchParams(searchParams: URLSearchParams): WorkbenchInit {
  const rawPayload = searchParams.get('payload');
  const source = searchParams.get('source');
  const shareId = searchParams.get('shareId');
  const fallbackMarkdown = defaultMarkdown;

  if (!rawPayload) {
    return {
      markdown: fallbackMarkdown,
      source,
      payloadDropped: false,
      shareId,
    };
  }

  if (rawPayload.length > MAX_URL_PAYLOAD_LENGTH) {
    return {
      markdown: fallbackMarkdown,
      source,
      payloadDropped: true,
      shareId,
    };
  }

  const payloadResult = z.string().trim().min(1).max(MAX_MARKDOWN_LENGTH).safeParse(rawPayload);

  if (!payloadResult.success) {
    return {
      markdown: fallbackMarkdown,
      source,
      payloadDropped: true,
      shareId,
    };
  }

  return {
    markdown: normalizeMarkdown(payloadResult.data),
    source,
    payloadDropped: false,
    shareId,
  };
}
