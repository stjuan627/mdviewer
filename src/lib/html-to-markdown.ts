import sanitizeHtml from 'sanitize-html';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { MAX_MARKDOWN_LENGTH } from '@/lib/constants';
import { htmlConversionInputSchema, normalizeMarkdown, renderRequestSchema } from '@/lib/schemas';

export type ConversionWarningCode =
  | 'blocked-content-removed'
  | 'unsafe-url-removed'
  | 'complex-table-flattened'
  | 'unsupported-element-unwrapped'
  | 'output-near-limit';

export type ConversionWarning = {
  code: ConversionWarningCode;
  message: string;
  count: number;
};

export type HtmlToMarkdownResult = {
  markdown: string;
  warnings: ConversionWarning[];
};

const BLOCKED_TAGS = [
  'script', 'style', 'noscript', 'template', 'iframe', 'object', 'embed', 'canvas', 'svg', 'form', 'button',
] as const;

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'b', 'em', 'i', 'del', 's', 'strike',
  'a', 'img', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th',
  'td', 'hr', 'div', 'section', 'article', 'main', 'header', 'footer', 'aside', 'span', 'figure', 'figcaption',
  'dl', 'dt', 'dd', 'input',
] as const;

const DOCUMENT_SHELL_TAGS = new Set(['html', 'head', 'body', 'title', 'meta', 'link', 'base']);

function countUnsupportedElements(html: string) {
  const allowed = new Set<string>(ALLOWED_TAGS);
  const blocked = new Set<string>(BLOCKED_TAGS);
  let count = 0;
  for (const match of html.matchAll(/<\s*([a-z][\w:-]*)\b/gi)) {
    const tag = match[1].toLowerCase();
    if (!allowed.has(tag) && !blocked.has(tag) && !DOCUMENT_SHELL_TAGS.has(tag)) count += 1;
  }
  return count;
}

function countMatches(input: string, pattern: RegExp) {
  return input.match(pattern)?.length ?? 0;
}

function decodeAttributeValue(value: string) {
  return value
    .replace(/&#(x[0-9a-f]+|\d+);?/gi, (_, entity: string) =>
      String.fromCodePoint(entity.toLowerCase().startsWith('x') ? Number.parseInt(entity.slice(1), 16) : Number(entity))
    )
    .replace(/&colon;?/gi, ':')
    .replace(/&(?:tab|newline);?/gi, '');
}

export function isSafeConversionUrl(value: string, kind: 'link' | 'image') {
  const decoded = decodeAttributeValue(value).trim();
  const schemeProbe = decoded.replace(/[\u0000-\u0020\u007f]+/g, '');

  if (!schemeProbe || schemeProbe.startsWith('//')) return false;
  if (kind === 'link' && schemeProbe.startsWith('#')) return true;
  if (/^(?:https?):/i.test(schemeProbe)) return true;
  if (kind === 'link' && /^mailto:/i.test(schemeProbe)) return true;
  if (/^[a-z][a-z\d+.-]*:/i.test(schemeProbe)) return false;
  return true;
}

function buildSanitizedFragment(html: string) {
  let unsafeUrlCount = 0;

  const fragment = sanitizeHtml(html, {
    allowedTags: [...ALLOWED_TAGS],
    allowedAttributes: {
      a: ['title', 'data-md-href'],
      img: ['alt', 'title', 'data-md-src'],
      code: ['class'],
      pre: ['class'],
      td: ['rowspan', 'colspan'],
      th: ['rowspan', 'colspan'],
      input: ['type', 'checked', 'disabled'],
      ol: ['start'],
    },
    nonTextTags: [...BLOCKED_TAGS],
    allowedSchemes: [],
    allowProtocolRelative: false,
    parser: { lowerCaseAttributeNames: true },
    transformTags: {
      a: (tagName, attributes) => {
        const href = attributes.href;
        if (href && isSafeConversionUrl(href, 'link')) {
          const attribs: Record<string, string> = { title: attributes.title ?? '', 'data-md-href': href };
          return { tagName, attribs };
        }
        if (href) unsafeUrlCount += 1;
        const attribs: Record<string, string> = { title: attributes.title ?? '' };
        return { tagName, attribs };
      },
      img: (tagName, attributes) => {
        const src = attributes.src;
        if (src && isSafeConversionUrl(src, 'image')) {
          const attribs: Record<string, string> = {
            alt: attributes.alt ?? '', title: attributes.title ?? '', 'data-md-src': src,
          };
          return {
            tagName,
            attribs,
          };
        }
        if (src) unsafeUrlCount += 1;
        const attribs: Record<string, string> = { alt: attributes.alt ?? '', title: attributes.title ?? '' };
        return { tagName, attribs };
      },
      input: (tagName, attributes) => {
        if (attributes.type?.toLowerCase() !== 'checkbox') return { tagName: 'span', attribs: {}, text: '' };
        const attribs: Record<string, string> = {
          type: 'checkbox',
          disabled: 'disabled',
        };
        if (Object.hasOwn(attributes, 'checked')) attribs.checked = 'checked';
        return {
          tagName,
          attribs,
        };
      },
    },
    exclusiveFilter(frame) {
      return frame.tag === 'img' && !frame.attribs['data-md-src'];
    },
  });

  return { fragment, unsafeUrlCount };
}

function escapeDestination(value: string) {
  return value.replace(/([()])/g, '\\$1');
}

function createTurndownService() {
  const service = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined',
  });
  service.use(gfm);

  service.addRule('gfmStrikethrough', {
    filter: (node) => ['DEL', 'S', 'STRIKE'].includes(node.nodeName),
    replacement: (content) => `~~${content}~~`,
  });
  service.addRule('horizontalRule', {
    filter: 'hr',
    replacement: () => '\n\n---\n\n',
  });

  service.addRule('inertLink', {
    filter: (node) => node.nodeName === 'A',
    replacement(content, node) {
      const href = (node as HTMLElement).getAttribute('data-md-href');
      if (!href) return content;
      const title = (node as HTMLElement).getAttribute('title');
      return `[${content}](${escapeDestination(href)}${title ? ` \"${title.replaceAll('"', '\\"')}\"` : ''})`;
    },
  });
  service.addRule('inertImage', {
    filter: (node) => node.nodeName === 'IMG',
    replacement(_content, node) {
      const element = node as HTMLElement;
      const src = element.getAttribute('data-md-src');
      if (!src) return '';
      const alt = (element.getAttribute('alt') ?? '').replaceAll(']', '\\]');
      const title = element.getAttribute('title');
      return `![${alt}](${escapeDestination(src)}${title ? ` \"${title.replaceAll('"', '\\"')}\"` : ''})`;
    },
  });
  service.addRule('fencedCodeWithLanguage', {
    filter: (node) => node.nodeName === 'PRE' && node.firstElementChild?.nodeName === 'CODE',
    replacement(_content, node) {
      const code = node.firstElementChild as HTMLElement;
      const raw = code.textContent ?? '';
      const className = `${code.getAttribute('class') ?? ''} ${(node as HTMLElement).getAttribute('class') ?? ''}`;
      const language = className.match(/(?:language-|lang-)([\w+-]+)/i)?.[1] ?? '';
      const longestRun = Math.max(0, ...Array.from(raw.matchAll(/`+/g), (match) => match[0].length));
      const fence = '`'.repeat(Math.max(3, longestRun + 1));
      const content = raw.replace(/^\n/, '').replace(/\n$/, '');
      return `\n\n${fence}${language}\n${content}\n${fence}\n\n`;
    },
  });

  return service;
}

function normalizeGeneratedMarkdown(markdown: string) {
  let inFence = false;
  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*`{3,}/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      return line.replace(/^(\s*(?:[-+*]|\d+\.))\s{2,}/, '$1 ');
    })
    .join('\n');
}

export function inspectSanitizedHtml(html: string) {
  const parsed = htmlConversionInputSchema.parse({ html });
  return buildSanitizedFragment(parsed.html).fragment;
}

export function convertHtmlToMarkdown(html: string): HtmlToMarkdownResult {
  const parsed = htmlConversionInputSchema.parse({ html });
  const blockedCount = countMatches(parsed.html, new RegExp(`<\\s*(?:${BLOCKED_TAGS.join('|')})\\b`, 'gi'));
  const complexTableCount = countMatches(parsed.html, /\b(?:rowspan|colspan)\s*=\s*["']?([2-9]|\d{2,})/gi);
  const unsupportedCount = countUnsupportedElements(parsed.html);
  const { fragment, unsafeUrlCount } = buildSanitizedFragment(parsed.html);
  const warnings: ConversionWarning[] = [];

  if (blockedCount > 0) warnings.push({ code: 'blocked-content-removed', count: blockedCount, message: `${blockedCount} unsafe or non-content element${blockedCount === 1 ? ' was' : 's were'} removed.` });
  if (unsafeUrlCount > 0) warnings.push({ code: 'unsafe-url-removed', count: unsafeUrlCount, message: `${unsafeUrlCount} unsafe link or image URL${unsafeUrlCount === 1 ? ' was' : 's were'} removed.` });
  if (complexTableCount > 0) warnings.push({ code: 'complex-table-flattened', count: complexTableCount, message: `${complexTableCount} merged table cell${complexTableCount === 1 ? ' was' : 's were'} flattened because GFM tables do not support rowspan or colspan.` });
  if (unsupportedCount > 0) warnings.push({ code: 'unsupported-element-unwrapped', count: unsupportedCount, message: `${unsupportedCount} unsupported HTML element${unsupportedCount === 1 ? ' was' : 's were'} unwrapped while its readable text was kept.` });

  let input: string | HTMLElement = fragment;
  if (typeof DOMParser !== 'undefined') {
    const document = new DOMParser().parseFromString(fragment, 'text/html');
    input = document.body;
  }

  const markdown = normalizeMarkdown(normalizeGeneratedMarkdown(createTurndownService().turndown(input)));
  renderRequestSchema.parse({ markdown });

  if (markdown.length >= MAX_MARKDOWN_LENGTH * 0.9) warnings.push({ code: 'output-near-limit', count: 1, message: 'The Markdown output is close to the viewer limit. Review it before continuing.' });
  return { markdown, warnings };
}
