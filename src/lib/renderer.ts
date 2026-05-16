import { gemoji } from 'gemoji';
import { marked } from 'marked';
import { markedEmoji } from 'marked-emoji';
import markedFootnote from 'marked-footnote';
import markedKatex from 'marked-katex-extension';
import sanitizeHtml from 'sanitize-html';
import { RENDERER_VERSION } from '@/lib/constants';

const emojiMap = Object.fromEntries(
  gemoji.flatMap((entry) => entry.names.map((name) => [name, entry.emoji]))
);

marked.use({
  gfm: true,
  breaks: false,
});

marked.use(
  markedKatex({
    strict: 'ignore',
    throwOnError: false,
  })
);

marked.use(
  markedEmoji({
    emojis: emojiMap,
    renderer: (token) => token.emoji,
  })
);

marked.use(
  markedFootnote({
    footnoteDivider: true,
  })
);

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'article',
    'aside',
    'blockquote',
    'code',
    'del',
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
    'input',
    'li',
    'main',
    'math',
    'ol',
    'p',
    'pre',
    'section',
    'span',
    'strong',
    'sub',
    'sup',
    'semantics',
    'annotation',
    'annotation-xml',
    'mrow',
    'mi',
    'mn',
    'mo',
    'msup',
    'msub',
    'msubsup',
    'mfrac',
    'msqrt',
    'mroot',
    'mspace',
    'mtext',
    'mtable',
    'mtr',
    'mtd',
    'munderover',
    'munder',
    'mover',
    'mstyle',
    'mphantom',
    'mpadded',
    'menclose',
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
    annotation: ['encoding'],
    'annotation-xml': ['encoding'],
    input: ['type', 'checked', 'disabled'],
    img: ['src', 'alt', 'title', 'loading'],
    code: ['class'],
    pre: ['class'],
    math: ['xmlns', 'display'],
    ol: ['start'],
    '*': ['class', 'aria-hidden', 'style'],
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
