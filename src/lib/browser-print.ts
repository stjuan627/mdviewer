import type { ThemeId } from '@/lib/themes';
import type { Locale } from '@/lib/i18n';

const PRINT_PAYLOAD_STORAGE_KEY = 'mdviewer-browser-print-payload';

// Browser print remains as an internal fallback path.
// The current product UI does not expose a direct menu entry for it.
type BrowserPrintPayload = {
  title: string;
  html: string;
  themeId: ThemeId;
  locale: Locale;
};

export function stageBrowserPrintPayload(payload: BrowserPrintPayload) {
  window.localStorage.setItem(PRINT_PAYLOAD_STORAGE_KEY, JSON.stringify(payload));
}

export function openBrowserPrintWindow(locale: Locale) {
  return window.open(`/print-preview?locale=${locale}`, '_blank', 'noopener,width=1200,height=1600');
}
