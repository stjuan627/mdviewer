import { atom } from 'nanostores';
import { defaultMarkdown } from '@/lib/sample-markdown';
import { normalizeMarkdown, parseWorkbenchSearchParams } from '@/lib/schemas';

export type WorkbenchNavigationPayload = {
  markdown: string;
  source: string | null;
};

export type WorkbenchRouteInit = {
  markdown: string;
  source: string | null;
  payloadDropped: boolean;
  shareId: string | null;
};

export const $workbenchNavigationPayload = atom<WorkbenchNavigationPayload | null>(null);

export function stageWorkbenchNavigationPayload(payload: WorkbenchNavigationPayload) {
  $workbenchNavigationPayload.set({
    markdown: normalizeMarkdown(payload.markdown),
    source: payload.source,
  });
}

export function consumeWorkbenchNavigationPayload() {
  const payload = $workbenchNavigationPayload.get();
  $workbenchNavigationPayload.set(null);
  return payload;
}

export function buildWorkbenchRouteInit(searchParams: URLSearchParams): WorkbenchRouteInit {
  const parsed = parseWorkbenchSearchParams(searchParams);

  return {
    markdown: parsed.markdown,
    source: parsed.source,
    payloadDropped: parsed.payloadDropped,
    shareId: parsed.shareId,
  };
}

export function getDefaultWorkbenchRouteInit(): WorkbenchRouteInit {
  return {
    markdown: defaultMarkdown,
    source: null,
    payloadDropped: false,
    shareId: null,
  };
}
