import { atom } from 'nanostores';
import { homeInitialMarkdown } from '@/lib/landing-pages/content/home';
import { normalizeMarkdown, parseWorkbenchSearchParams } from '@/lib/schemas';
import { DEFAULT_THEME_ID, type ThemeId } from '@/lib/themes';

export type WorkbenchNavigationPayload = {
  markdown: string;
  source: string | null;
  themeId: ThemeId;
};

export type WorkbenchRouteInit = {
  markdown: string;
  source: string | null;
  payloadDropped: boolean;
  shareId: string | null;
  themeId: ThemeId;
};

export const $workbenchNavigationPayload = atom<WorkbenchNavigationPayload | null>(null);

export function stageWorkbenchNavigationPayload(payload: WorkbenchNavigationPayload) {
  $workbenchNavigationPayload.set({
    markdown: normalizeMarkdown(payload.markdown),
    source: payload.source,
    themeId: payload.themeId,
  });
}

export function consumeWorkbenchNavigationPayload() {
  const payload = $workbenchNavigationPayload.get();
  $workbenchNavigationPayload.set(null);
  return payload;
}

export function buildWorkbenchRouteInit(
  searchParams: URLSearchParams,
  fallbackMarkdown = homeInitialMarkdown
): WorkbenchRouteInit {
  const parsed = parseWorkbenchSearchParams(searchParams, fallbackMarkdown);

  return {
    markdown: parsed.markdown,
    source: parsed.source,
    payloadDropped: parsed.payloadDropped,
    shareId: parsed.shareId,
    themeId: parsed.themeId,
  };
}

export function getDefaultWorkbenchRouteInit(fallbackMarkdown = homeInitialMarkdown): WorkbenchRouteInit {
  return {
    markdown: fallbackMarkdown,
    source: null,
    payloadDropped: false,
    shareId: null,
    themeId: DEFAULT_THEME_ID,
  };
}
