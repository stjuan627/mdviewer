import type { ThemeId } from '@/lib/themes';

const PRINT_EXTRA_CSS = `
  @page {
    size: A4;
    margin: 12mm;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-size: 12px;
    line-height: 1.75;
  }

  .browser-print-root {
    width: 100%;
  }
`;

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getClonedStylesMarkup() {
  return Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join('\n');
}

export function openBrowserPrintWindow(input: { title: string; html: string; themeId: ThemeId }) {
  const popup = window.open('', '_blank', 'noopener,noreferrer,width=1200,height=1600');

  if (!popup) {
    return null;
  }

  const title = escapeHtml(input.title);
  const themeId = escapeHtml(input.themeId);
  const stylesMarkup = getClonedStylesMarkup();
  const documentHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <base href="${window.location.origin}/" />
    ${stylesMarkup}
    <style>${PRINT_EXTRA_CSS}</style>
    <script>
      window.addEventListener('load', async () => {
        try {
          if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
          }

          await new Promise((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(resolve));
          });

          window.print();
        } catch (error) {
          console.error(error);
        }
      });

      window.addEventListener('afterprint', () => {
        try {
          window.close();
        } catch (error) {
          console.error(error);
        }
      });
    </script>
  </head>
  <body>
    <main class="browser-print-root">
      <article class="prose" data-theme="${themeId}">
        ${input.html}
      </article>
    </main>
  </body>
</html>`;

  popup.document.open();
  popup.document.write(documentHtml);
  popup.document.close();
  popup.focus();

  return popup;
}
