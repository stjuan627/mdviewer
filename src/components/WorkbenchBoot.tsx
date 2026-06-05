import { useEffect, useState } from 'react';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { Workbench } from '@/components/Workbench';
import type { Locale } from '@/lib/i18n';
import type { WorkbenchLandingVariant } from '@/lib/landing-pages';
import {
  buildWorkbenchRouteInit,
  consumeWorkbenchNavigationPayload,
  getDefaultWorkbenchRouteInit,
  type WorkbenchRouteInit,
} from '@/lib/workbench-navigation-store';

type WorkbenchBootProps = {
  locale: Locale;
  title?: string;
  description?: string;
  initialMarkdown?: string;
  variant?: WorkbenchLandingVariant;
};

function readRouteInit(initialMarkdown?: string) {
  if (typeof window === 'undefined') {
    return getDefaultWorkbenchRouteInit(initialMarkdown);
  }

  return buildWorkbenchRouteInit(new URL(window.location.href).searchParams, initialMarkdown);
}

function readInitialWorkbenchInit(initialMarkdown?: string) {
  const routeInit = readRouteInit(initialMarkdown);

  if (typeof window === 'undefined') {
    return routeInit;
  }

  const navigationPayload = consumeWorkbenchNavigationPayload();

  if (!navigationPayload) {
    return routeInit;
  }

  return {
    markdown: navigationPayload.markdown,
    source: navigationPayload.source,
    payloadDropped: false,
    shareId: null,
    themeId: navigationPayload.themeId,
  } satisfies WorkbenchRouteInit;
}

export function WorkbenchBoot({
  locale,
  title,
  description,
  initialMarkdown,
  variant,
}: WorkbenchBootProps) {
  const [init, setInit] = useState<WorkbenchRouteInit>(() => readInitialWorkbenchInit(initialMarkdown));

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const routeInit = readRouteInit(initialMarkdown);
      if (!routeInit.shareId) {
        return;
      }

      try {
        const response = await fetch(`/api/share/${routeInit.shareId}`);
        const data: { markdown?: string; themeId?: WorkbenchRouteInit['themeId']; error?: string } = await response.json();

        if (response.ok && typeof data.markdown === 'string' && !cancelled) {
          setInit({
            ...routeInit,
            markdown: data.markdown,
            themeId: data.themeId ?? routeInit.themeId,
            payloadDropped: false,
          });
        }
      } catch {
        // Keep the already initialized route state when share hydration fails.
      }
    }

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [initialMarkdown]);

  return (
    <I18nProvider locale={locale}>
      <Workbench
        locale={locale}
        initialMarkdown={init.markdown}
        payloadDropped={init.payloadDropped}
        initialThemeId={init.themeId}
        title={title}
        description={description}
        exportOptions={variant?.exportOptions}
      />
    </I18nProvider>
  );
}
