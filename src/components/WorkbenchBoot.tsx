import { useEffect, useState } from 'react';
import { Workbench } from '@/components/Workbench';
import {
  buildWorkbenchRouteInit,
  consumeWorkbenchNavigationPayload,
  getDefaultWorkbenchRouteInit,
  type WorkbenchRouteInit,
} from '@/lib/workbench-navigation-store';

type WorkbenchBootProps = {
  title?: string;
  description?: string;
};

function readRouteInit() {
  if (typeof window === 'undefined') {
    return getDefaultWorkbenchRouteInit();
  }

  return buildWorkbenchRouteInit(new URL(window.location.href).searchParams);
}

function readInitialWorkbenchInit() {
  const routeInit = readRouteInit();

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

export function WorkbenchBoot({ title, description }: WorkbenchBootProps) {
  const [init, setInit] = useState<WorkbenchRouteInit>(() => readInitialWorkbenchInit());

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const routeInit = readRouteInit();
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
  }, []);

  return (
    <Workbench
      initialMarkdown={init.markdown}
      payloadDropped={init.payloadDropped}
      initialThemeId={init.themeId}
      title={title}
      description={description}
    />
  );
}
