import katexCss from 'katex/dist/katex.min.css?raw';
import { renderResult } from '@/lib/renderer';
import type { ThemeId } from '@/lib/themes';

const pdfDocumentCss = `
  :root {
    color-scheme: light;
    --text-primary: #2c2421;
    --text-secondary: #5c544f;
    --text-muted: #8c847f;
    --border-subtle: #eae0d5;
    --border-medium: #d7c4b2;
    --radius-md: 8px;
    --radius-lg: 12px;
    --font-heading: Georgia, "Times New Roman", serif;
    --font-body: "Segoe UI", Arial, sans-serif;
    --font-mono: "SFMono-Regular", "Cascadia Code", "JetBrains Mono", monospace;
    --theme-text: var(--text-primary);
    --theme-heading: var(--text-primary);
    --theme-heading-font: var(--font-heading);
    --theme-body-font: var(--font-body);
    --theme-inline-code-bg: rgba(44, 36, 33, 0.06);
    --theme-inline-code-color: var(--text-primary);
    --theme-pre-bg: #2c2421;
    --theme-pre-color: #f9f6f0;
    --theme-blockquote-bg: #fdf6ec;
    --theme-blockquote-border: var(--border-medium);
    --theme-blockquote-color: var(--text-secondary);
    --theme-table-border: var(--border-subtle);
    --theme-link: #9a5b2d;
    --theme-link-hover: #7f461b;
    --theme-selection: rgba(215, 196, 178, 0.28);
    --theme-rule: rgba(215, 196, 178, 0.8);
  }

  @page {
    size: A4;
    margin: 12mm;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: var(--theme-text);
    font-family: var(--theme-body-font);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-size: 12px;
    line-height: 1.75;
  }

  .pdf-document {
    width: 100%;
  }

  .prose {
    color: var(--theme-text);
    font-family: var(--theme-body-font);
    line-height: 1.8;
  }

  .prose > :first-child {
    margin-top: 0;
  }

  .prose > :last-child {
    margin-bottom: 0;
  }

  .prose h1,
  .prose h2,
  .prose h3,
  .prose h4 {
    margin-top: 1.45em;
    margin-bottom: 0.55em;
    color: var(--theme-heading);
    font-family: var(--theme-heading-font);
    line-height: 1.18;
    break-after: avoid-page;
  }

  .prose h1 {
    font-size: 2.2rem;
    letter-spacing: -0.03em;
  }

  .prose h2 {
    font-size: 1.56rem;
  }

  .prose h3 {
    font-size: 1.18rem;
  }

  .prose p,
  .prose ul,
  .prose ol,
  .prose pre,
  .prose .katex-display,
  .prose blockquote,
  .prose table,
  .prose hr {
    margin: 1em 0;
  }

  .prose ul,
  .prose ol {
    padding-left: 1.3rem;
  }

  .prose li {
    color: inherit;
  }

  .prose li + li {
    margin-top: 0.35em;
  }

  .prose li:has(input[type='checkbox']) {
    list-style: none;
  }

  .prose input[type='checkbox'] {
    margin-right: 0.55em;
    accent-color: currentColor;
  }

  .prose blockquote {
    margin-left: 0;
    border-left: 4px solid var(--theme-blockquote-border);
    background: var(--theme-blockquote-bg);
    color: var(--theme-blockquote-color);
    padding: 14px 18px;
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    break-inside: avoid;
  }

  .prose pre {
    overflow-x: auto;
    border-radius: var(--radius-md);
    background: var(--theme-pre-bg);
    color: var(--theme-pre-color);
    padding: 16px;
    white-space: pre-wrap;
    word-break: break-word;
    break-inside: avoid;
  }

  .prose code {
    font-family: var(--font-mono);
  }

  .prose :not(pre) > code {
    border-radius: 6px;
    background: var(--theme-inline-code-bg);
    color: var(--theme-inline-code-color);
    padding: 0.16em 0.42em;
  }

  .prose .katex {
    color: inherit;
    font-size: 1em;
  }

  .prose .katex-display {
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.2em 0;
    break-inside: avoid;
  }

  .prose .katex-display > .katex {
    display: inline-block;
    min-width: 100%;
  }

  .prose table {
    width: 100%;
    border-collapse: collapse;
    break-inside: avoid;
  }

  .prose th,
  .prose td {
    border: 1px solid var(--theme-table-border);
    padding: 10px 12px;
    text-align: left;
    vertical-align: top;
  }

  .prose th {
    color: var(--theme-heading);
    font-weight: 700;
  }

  .prose img {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    break-inside: avoid;
  }

  .prose hr {
    border: 0;
    border-top: 1px solid var(--theme-rule);
  }

  .prose a {
    color: var(--theme-link);
    text-decoration: underline;
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.18em;
  }

  .prose .footnotes {
    margin-top: 2.2rem;
    border-top: 1px solid var(--theme-rule);
    padding-top: 1rem;
    font-size: 0.93rem;
  }

  .prose .footnotes h2 {
    margin-top: 0;
    font-size: 1rem;
  }

  .prose .footnotes ol {
    margin: 0.9rem 0 0;
    padding-left: 1.2rem;
  }

  .prose .footnotes a[data-footnote-backref] {
    margin-left: 0.35rem;
    white-space: nowrap;
  }

  .prose[data-theme='paper'] {
    --theme-text: #3d322d;
    --theme-heading: #241b18;
    --theme-heading-font: Georgia, "Times New Roman", serif;
    --theme-body-font: "Segoe UI", Arial, sans-serif;
    --theme-inline-code-bg: rgba(95, 66, 44, 0.1);
    --theme-inline-code-color: #5e3c27;
    --theme-pre-bg: #2c2421;
    --theme-pre-color: #f9f6f0;
    --theme-blockquote-bg: #fbf2e8;
    --theme-blockquote-border: #d4b798;
    --theme-blockquote-color: #5a4a40;
    --theme-table-border: rgba(215, 196, 178, 0.9);
    --theme-link: #9a5b2d;
    --theme-link-hover: #7f461b;
    --theme-rule: rgba(215, 196, 178, 0.8);
  }

  .prose[data-theme='blueprint'] {
    --theme-text: #23415c;
    --theme-heading: #102c44;
    --theme-heading-font: "Courier New", monospace;
    --theme-body-font: "Segoe UI", Arial, sans-serif;
    --theme-inline-code-bg: rgba(58, 107, 170, 0.12);
    --theme-inline-code-color: #1d5f96;
    --theme-pre-bg: #11293f;
    --theme-pre-color: #e6f1ff;
    --theme-blockquote-bg: #eaf2ff;
    --theme-blockquote-border: #5b8dc5;
    --theme-blockquote-color: #315274;
    --theme-table-border: rgba(164, 190, 221, 0.95);
    --theme-link: #1f6ba8;
    --theme-link-hover: #15517f;
    --theme-rule: rgba(164, 190, 221, 0.95);
  }

  .prose[data-theme='blueprint'] h1,
  .prose[data-theme='blueprint'] h2,
  .prose[data-theme='blueprint'] h3,
  .prose[data-theme='blueprint'] h4 {
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .prose[data-theme='nocturne'] {
    --theme-text: #2b2432;
    --theme-heading: #17111c;
    --theme-heading-font: Georgia, "Times New Roman", serif;
    --theme-body-font: "Segoe UI", Arial, sans-serif;
    --theme-inline-code-bg: rgba(76, 57, 108, 0.1);
    --theme-inline-code-color: #50386f;
    --theme-pre-bg: #17111c;
    --theme-pre-color: #f5f1ff;
    --theme-blockquote-bg: #f3edff;
    --theme-blockquote-border: #ad8af0;
    --theme-blockquote-color: #5f4b7d;
    --theme-table-border: rgba(176, 163, 209, 0.92);
    --theme-link: #6f53ae;
    --theme-link-hover: #563b90;
    --theme-rule: rgba(176, 163, 209, 0.85);
  }
`;

export function buildServerPdfDocument(markdown: string, themeId: ThemeId) {
  const rendered = renderResult(markdown);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${katexCss}</style>
    <style>${pdfDocumentCss}</style>
  </head>
  <body>
    <main class="pdf-document">
      <article class="prose" data-theme="${themeId}">
        ${rendered.html}
      </article>
    </main>
  </body>
</html>`;
}
