import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { RENDERER_VERSION } from '@/lib/constants';

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

export function renderMarkdown(markdown: string) {
  return marked.parse(markdown) as string;
}

export function sanitizeRenderedHtml(html: string) {
  return sanitizeHtml(html, sanitizeOptions);
}

export function renderResult(markdown: string) {
  const rendered = renderMarkdown(markdown);
  const html = sanitizeRenderedHtml(rendered);

  return {
    html,
    rendererVersion: RENDERER_VERSION,
  };
}
