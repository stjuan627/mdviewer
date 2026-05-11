import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { RENDERER_VERSION } from '@/lib/constants';
import { viewRegistry } from '@/lib/views';

marked.use({
  gfm: true,
  breaks: false,
});

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'article',
    'aside',
    'blockquote',
    'code',
    'div',
    'em',
    'figcaption',
    'figure',
    'footer',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hr',
    'img',
    'li',
    'main',
    'ol',
    'p',
    'pre',
    'section',
    'span',
    'strong',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tr',
    'ul',
    'a',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'loading'],
    code: ['class'],
    pre: ['class'],
    '*': ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesAppliedToAttributes: ['href', 'src'],
  allowProtocolRelative: false,
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getTitle(markdown: string) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || 'Untitled draft';
}

function getExcerpt(markdown: string) {
  const lines = markdown
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith('#') && !line.startsWith('```'));

  return lines[0] || 'Polished for publishing from the same Markdown source.';
}

function wrapArticle(html: string, markdown: string) {
  const view = viewRegistry.article;
  const title = escapeHtml(getTitle(markdown));
  const excerpt = escapeHtml(getExcerpt(markdown));

  return `
    <article class="result-shell result-shell--article">
      <header class="result-hero">
        <p class="result-eyebrow">${view.eyebrow}</p>
        <h1>${title}</h1>
        <p class="result-excerpt">${excerpt}</p>
      </header>
      <div class="result-body prose">${html}</div>
      <footer class="result-footer">
        <strong>${escapeHtml(view.title)}</strong>
        <p>${escapeHtml(view.cta)}</p>
      </footer>
    </article>
  `;
}

function collectHighlights(markdown: string) {
  const matches = [...markdown.matchAll(/^-\s+(.+)$/gm)].slice(0, 4);
  return matches.map((match) => `<li>${escapeHtml(match[1].trim())}</li>`).join('');
}

function wrapRelease(html: string, markdown: string) {
  const view = viewRegistry.release;
  const title = escapeHtml(getTitle(markdown));
  const excerpt = escapeHtml(getExcerpt(markdown));
  const highlights = collectHighlights(markdown);

  return `
    <article class="result-shell result-shell--release">
      <header class="result-hero result-hero--release">
        <div>
          <p class="result-eyebrow">${view.eyebrow}</p>
          <h1>${title}</h1>
          <p class="result-excerpt">${excerpt}</p>
        </div>
        <div class="result-badge">Release notes</div>
      </header>
      ${highlights ? `<section class="release-highlights"><h2>Highlights</h2><ul>${highlights}</ul></section>` : ''}
      <div class="result-body prose">${html}</div>
      <footer class="result-footer result-footer--release">
        <strong>${escapeHtml(view.title)}</strong>
        <p>${escapeHtml(view.cta)}</p>
      </footer>
    </article>
  `;
}

export function renderMarkdown(markdown: string) {
  return marked.parse(markdown) as string;
}

export function sanitizeRenderedHtml(html: string) {
  return sanitizeHtml(html, sanitizeOptions);
}

export function renderResult(markdown: string, view: MarkdownBoxView) {
  const rendered = renderMarkdown(markdown);
  const sanitized = sanitizeRenderedHtml(rendered);
  const html = view === 'release' ? wrapRelease(sanitized, markdown) : wrapArticle(sanitized, markdown);

  return {
    html: sanitizeRenderedHtml(html),
    rendererVersion: RENDERER_VERSION,
  };
}
