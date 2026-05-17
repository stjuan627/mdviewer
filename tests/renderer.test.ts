import { describe, expect, it } from 'vitest';
import { getLandingPageConfig } from '@/lib/landing-pages';
import { homeInitialMarkdown } from '@/lib/landing-pages/content/home';
import { renderResult, sanitizeRenderedHtml } from '@/lib/renderer';
import { parseWorkbenchSearchParams } from '@/lib/schemas';
import { buildShareRecord } from '@/lib/share';

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
    const matches = preview.html.match(/<h1\b/g) ?? [];

    expect(matches).toHaveLength(1);
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
    const landing = getLandingPageConfig('markdown-to-pdf');
    const params = new URLSearchParams({ payload: 'x'.repeat(4000) });
    const parsed = parseWorkbenchSearchParams(params, landing.initialMarkdown);

    expect(parsed.payloadDropped).toBe(true);
    expect(parsed.markdown).toBe(landing.initialMarkdown);
  });
});
