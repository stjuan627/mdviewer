import { useEffect, useState } from 'react';
import { Workbench } from '@/components/Workbench';
import {
  buildWorkbenchRouteInit,
  consumeWorkbenchNavigationPayload,
  getDefaultWorkbenchRouteInit,
  type WorkbenchRouteInit,
} from '@/lib/workbench-navigation-store';

function readRouteInit() {
  if (typeof window === 'undefined') {
    return getDefaultWorkbenchRouteInit();
  }

  return buildWorkbenchRouteInit(new URL(window.location.href).searchParams);
}

export function WorkbenchBoot() {
  const [init, setInit] = useState<WorkbenchRouteInit>(() => readRouteInit());

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const routeInit = readRouteInit();
      const navigationPayload = consumeWorkbenchNavigationPayload();

      if (navigationPayload) {
        const nextInit: WorkbenchRouteInit = {
          markdown: navigationPayload.markdown,
          source: navigationPayload.source,
          payloadDropped: false,
          shareId: null,
        };

        if (!cancelled) {
          setInit(nextInit);
        }
        return;
      }

      if (routeInit.shareId) {
        try {
          const response = await fetch(`/api/share/${routeInit.shareId}`);
          const data: { markdown?: string; error?: string } = await response.json();

          if (response.ok && typeof data.markdown === 'string') {
            if (!cancelled) {
              setInit({
                ...routeInit,
                markdown: data.markdown,
                payloadDropped: false,
              });
            }
            return;
          }
        } catch {
          // Fall back to route defaults when share hydration fails.
        }
      }

      if (!cancelled) {
        setInit(routeInit);
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
      source={init.source}
      payloadDropped={init.payloadDropped}
    />
  );
}
