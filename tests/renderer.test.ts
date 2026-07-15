import { describe, expect, it } from 'vitest';
import { getLandingPageConfig } from '@/lib/landing-pages';
import { homeInitialMarkdown } from '@/lib/landing-pages/content/home';
import { getAlternateLocaleUrls, localizePath, localeSchema, resolveCanonicalUrl, swapLocaleInPath } from '@/lib/i18n';
import { renderResult, sanitizeRenderedHtml } from '@/lib/renderer';
import { parseWorkbenchSearchParams, pdfRequestSchema } from '@/lib/schemas';
import { buildShareRecord } from '@/lib/share';
import { getToolPageConfig } from '@/lib/tool-pages';

describe('renderer parity', () => {
  it('keeps preview html equal to snapshotHtml', () => {
    const preview = renderResult(homeInitialMarkdown);
    const share = buildShareRecord({
      id: 'share-1',
      markdown: homeInitialMarkdown,
      themeId: 'paper',
      createdAt: '2026-05-11T00:00:00.000Z',
    });

    expect(share.snapshotHtml).toBe(preview.html);
    expect(share.rendererVersion).toBe(preview.rendererVersion);
  });

  it('renders only the markdown HTML without injected shell content', () => {
    const preview = renderResult(homeInitialMarkdown);

    expect(preview.html).toContain('Online Markdown Viewer with Live Preview');
    expect(preview.html).not.toContain('result-shell');
    expect(preview.html).not.toContain('Markdown Workbench');
    expect(preview.html).not.toContain('Write, preview, and perfect your Markdown.');
  });

  it('renders latex, emoji shortcodes, and footnotes through the same pipeline', () => {
    const preview = renderResult([
      'Inline math $E = mc^2$ and emoji :rocket:.[^proof]',
      '',
      '$$',
      '\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}',
      '$$',
      '',
      '[^proof]: Footnote content',
    ].join('\n'));

    expect(preview.html).toContain('class="katex"');
    expect(preview.html).toContain('🚀');
    expect(preview.html).not.toContain(':rocket:');
    expect(preview.html).toContain('class="footnotes"');
    expect(preview.html).toContain('Footnote content');
  });
});

describe('sanitize rules', () => {
  it('removes script tags, inline handlers, javascript links and inline svg payloads', () => {
    const dirty = [
      '<script>alert(1)</script>',
      '<a href="javascript:alert(1)" onclick="alert(1)">bad</a>',
      '<svg><script>alert(1)</script></svg>',
      '<img src="https://example.com/x.png" onerror="alert(1)" />',
    ].join('');

    const clean = sanitizeRenderedHtml(dirty);

    expect(clean).not.toContain('<script');
    expect(clean).not.toContain('onclick');
    expect(clean).not.toContain('javascript:');
    expect(clean).not.toContain('<svg');
    expect(clean).not.toContain('onerror');
  });

  it('keeps safe katex and footnote markup intact', () => {
    const rendered = renderResult('Math $E = mc^2$.[^1]\n\n[^1]: Note');

    expect(rendered.html).toContain('class="katex"');
    expect(rendered.html).toContain('class="footnotes"');
    expect(rendered.html).toContain('href="#footnote-1"');
    expect(rendered.html).toContain('href="#footnote-ref-1"');
  });
});

describe('workbench search params', () => {
  it('ignores legacy view params', () => {
    const params = new URLSearchParams({ view: 'weird' });
    const parsed = parseWorkbenchSearchParams(params);

    expect(parsed.payloadDropped).toBe(false);
  });

  it('drops overlong payloads back to default example', () => {
    const params = new URLSearchParams({
      view: 'article',
      payload: 'x'.repeat(4000),
    });
    const parsed = parseWorkbenchSearchParams(params);

    expect(parsed.payloadDropped).toBe(true);
    expect(parsed.markdown).toBe(homeInitialMarkdown);
  });

  it('supports a page-specific fallback markdown sample', () => {
    const landing = getLandingPageConfig('markdown-to-pdf', 'en');
    const params = new URLSearchParams({ payload: 'x'.repeat(4000) });
    const parsed = parseWorkbenchSearchParams(params, landing.initialMarkdown);

    expect(parsed.payloadDropped).toBe(true);
    expect(parsed.markdown).toBe(landing.initialMarkdown);
  });
});

describe('locale helpers', () => {
  it('localizes and swaps paths correctly', () => {
    expect(localizePath('/', 'en')).toBe('/');
    expect(localizePath('/', 'fr')).toBe('/fr');
    expect(localizePath('/', 'es')).toBe('/es');
    expect(localizePath('/', 'de')).toBe('/de');
    expect(localizePath('/', 'zh-cn')).toBe('/zh-cn');
    expect(localizePath('/', 'ko')).toBe('/ko');
    expect(localizePath('/markdown-to-pdf', 'fr')).toBe('/fr/markdown-to-pdf');
    expect(localizePath('/markdown-to-pdf', 'es')).toBe('/es/markdown-to-pdf');
    expect(localizePath('/markdown-to-pdf', 'de')).toBe('/de/markdown-to-pdf');
    expect(localizePath('/markdown-to-pdf', 'zh-cn')).toBe('/zh-cn/markdown-to-pdf');
    expect(localizePath('/markdown-to-pdf', 'ko')).toBe('/ko/markdown-to-pdf');
    expect(swapLocaleInPath('/markdown-to-pdf', 'fr')).toBe('/fr/markdown-to-pdf');
    expect(swapLocaleInPath('/markdown-to-pdf', 'es')).toBe('/es/markdown-to-pdf');
    expect(swapLocaleInPath('/markdown-to-pdf', 'de')).toBe('/de/markdown-to-pdf');
    expect(swapLocaleInPath('/markdown-to-pdf', 'zh-cn')).toBe('/zh-cn/markdown-to-pdf');
    expect(swapLocaleInPath('/markdown-to-pdf', 'ko')).toBe('/ko/markdown-to-pdf');
    expect(swapLocaleInPath('/fr/markdown-to-pdf', 'en')).toBe('/markdown-to-pdf');
    expect(swapLocaleInPath('/es/markdown-to-pdf', 'en')).toBe('/markdown-to-pdf');
    expect(swapLocaleInPath('/de/markdown-to-pdf', 'en')).toBe('/markdown-to-pdf');
    expect(swapLocaleInPath('/zh-cn/markdown-to-pdf', 'en')).toBe('/markdown-to-pdf');
    expect(swapLocaleInPath('/ko/markdown-to-pdf', 'en')).toBe('/markdown-to-pdf');
    expect(swapLocaleInPath('/fr', 'en')).toBe('/');
    expect(swapLocaleInPath('/es', 'en')).toBe('/');
    expect(swapLocaleInPath('/de', 'en')).toBe('/');
    expect(swapLocaleInPath('/zh-cn', 'en')).toBe('/');
    expect(swapLocaleInPath('/ko', 'en')).toBe('/');
  });

  it('builds canonical and alternate locale urls', () => {
    expect(resolveCanonicalUrl('/markdown-to-pdf', 'fr', 'https://mdviewer.net')).toBe(
      'https://mdviewer.net/fr/markdown-to-pdf'
    );
    expect(resolveCanonicalUrl('/markdown-to-pdf', 'es', 'https://mdviewer.net')).toBe(
      'https://mdviewer.net/es/markdown-to-pdf'
    );
    expect(resolveCanonicalUrl('/markdown-to-pdf', 'de', 'https://mdviewer.net')).toBe(
      'https://mdviewer.net/de/markdown-to-pdf'
    );
    expect(resolveCanonicalUrl('/markdown-to-pdf', 'zh-cn', 'https://mdviewer.net')).toBe(
      'https://mdviewer.net/zh-cn/markdown-to-pdf'
    );
    expect(getAlternateLocaleUrls('/markdown-to-pdf', 'https://mdviewer.net')).toEqual({
      en: 'https://mdviewer.net/markdown-to-pdf',
      fr: 'https://mdviewer.net/fr/markdown-to-pdf',
      es: 'https://mdviewer.net/es/markdown-to-pdf',
      de: 'https://mdviewer.net/de/markdown-to-pdf',
      'zh-cn': 'https://mdviewer.net/zh-cn/markdown-to-pdf',
      ja: 'https://mdviewer.net/ja/markdown-to-pdf',
      ko: 'https://mdviewer.net/ko/markdown-to-pdf',
    });
  });
});

describe('locale and pdf schemas', () => {
  it('validates supported locales', () => {
    expect(localeSchema.safeParse('en').success).toBe(true);
    expect(localeSchema.safeParse('fr').success).toBe(true);
    expect(localeSchema.safeParse('es').success).toBe(true);
    expect(localeSchema.safeParse('de').success).toBe(true);
    expect(localeSchema.safeParse('zh-cn').success).toBe(true);
    expect(localeSchema.safeParse('ja').success).toBe(true);
    expect(localeSchema.safeParse('ko').success).toBe(true);
  });

  it('accepts locale-aware pdf requests', () => {
    const parsed = pdfRequestSchema.parse({
      markdown: '# hello',
      themeId: 'paper',
      locale: 'zh-cn',
    });

    expect(parsed.locale).toBe('zh-cn');
    expect(parsed.themeId).toBe('paper');
  });
});

describe('English-only tool page SEO', () => {
  it('exposes matching software and FAQ schema', () => {
    const page = getToolPageConfig('markdown-table-generator');
    const schemaTypes = page.schema.map((entry) => entry['@type']);

    expect(page.path).toBe('/markdown-table-generator');
    expect(page.title).toContain('Markdown Table Generator');
    expect(schemaTypes).toContain('SoftwareApplication');
    expect(schemaTypes).toContain('FAQPage');
  });

  it('exposes matching HTML converter software and FAQ schema', () => {
    const page = getToolPageConfig('html-to-markdown');
    const schemaTypes = page.schema.map((entry) => entry['@type']);
    const faqSection = page.sections.find((section) => section.id === 'faq');
    const faqSchema = page.schema.find((entry) => entry['@type'] === 'FAQPage');

    expect(page.path).toBe('/html-to-markdown');
    expect(page.title).toContain('HTML to Markdown Converter');
    expect(schemaTypes).toContain('SoftwareApplication');
    expect(schemaTypes).toContain('FAQPage');
    expect((faqSchema?.mainEntity as unknown[]).length).toBe(faqSection?.faqItems?.length);
  });
});
