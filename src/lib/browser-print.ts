import type { ThemeId } from '@/lib/themes';

const PRINT_PAYLOAD_STORAGE_KEY = 'mdviewer-browser-print-payload';

// Browser print remains as an internal fallback path.
// The current product UI does not expose a direct menu entry for it.
type BrowserPrintPayload = {
  title: string;
  html: string;
  themeId: ThemeId;
};

export function stageBrowserPrintPayload(payload: BrowserPrintPayload) {
  window.localStorage.setItem(PRINT_PAYLOAD_STORAGE_KEY, JSON.stringify(payload));
}

export function openBrowserPrintWindow() {
  return window.open('/print-preview', '_blank', 'noopener,width=1200,height=1600');
}
