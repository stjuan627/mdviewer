import { describe, expect, it } from 'vitest';
import { renderResult, sanitizeRenderedHtml } from '@/lib/renderer';
import { defaultMarkdown } from '@/lib/sample-markdown';
import { parseWorkbenchSearchParams } from '@/lib/schemas';
import { buildShareRecord } from '@/lib/share';

describe('renderer parity', () => {
  it('keeps preview html equal to snapshotHtml', () => {
    const preview = renderResult(defaultMarkdown);
    const share = buildShareRecord({
      id: 'share-1',
      markdown: defaultMarkdown,
      createdAt: '2026-05-11T00:00:00.000Z',
    });

    expect(share.snapshotHtml).toBe(preview.html);
    expect(share.rendererVersion).toBe(preview.rendererVersion);
  });

  it('renders only the markdown HTML without injected shell content', () => {
    const preview = renderResult(defaultMarkdown);
    const matches = preview.html.match(/<h1\b/g) ?? [];

    expect(matches).toHaveLength(1);
    expect(preview.html).not.toContain('result-shell');
    expect(preview.html).not.toContain('Release notes');
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
    expect(parsed.markdown).toBe(defaultMarkdown);
  });
});
