import { describe, expect, it } from 'vitest';
import {
  convertHtmlToMarkdown,
  inspectSanitizedHtml,
  isSafeConversionUrl,
} from '@/lib/html-to-markdown';
import { HTML_TO_MARKDOWN_LIMITS } from '@/lib/schemas';
import { renderResult } from '@/lib/renderer';

describe('HTML to Markdown conversion', () => {
  it('converts semantic text and GFM extensions', () => {
    const result = convertHtmlToMarkdown(`
      <h1>Guide</h1><p><strong>Bold</strong> and <em>useful</em> with <s>old</s>.</p>
      <ol><li>First</li><li>Second<ul><li>Nested</li></ul></li></ol>
      <ul><li><input type="checkbox" checked disabled>Done</li><li><input type="checkbox" disabled>Next</li></ul>
      <blockquote>Keep structure</blockquote><hr>
    `);

    expect(result.markdown).toContain('# Guide');
    expect(result.markdown).toContain('**Bold**');
    expect(result.markdown).toContain('*useful*');
    expect(result.markdown).toContain('~~old~~');
    expect(result.markdown).toContain('1. First');
    expect(result.markdown).toContain('- [x] Done');
    expect(result.markdown).toContain('- [ ] Next');
    expect(result.markdown).toContain('> Keep structure');
  });

  it('keeps inline code containing backticks valid', () => {
    const result = convertHtmlToMarkdown('<p>Run <code>const value = `ready`</code> now.</p>');
    expect(result.markdown).toContain('`` const value = `ready` ``');
  });

  it('keeps safe links and images while removing unsafe URL schemes', () => {
    const result = convertHtmlToMarkdown(`
      <a href="https://example.com/a">HTTP</a>
      <a href="/docs/start">Relative</a><a href="#part">Fragment</a><a href="mailto:hi@example.com">Mail</a>
      <img src="images/guide.png" alt="Guide">
      <a href="JaVaScRiPt:alert(1)">Bad</a><a href="java&#x0A;script:alert(1)">Encoded</a>
      <img src="data:image/png;base64,abc" alt="Unsafe">
    `);

    expect(result.markdown).toContain('[HTTP](https://example.com/a)');
    expect(result.markdown).toContain('[Relative](/docs/start)');
    expect(result.markdown).toContain('[Fragment](#part)');
    expect(result.markdown).toContain('[Mail](mailto:hi@example.com)');
    expect(result.markdown).toContain('![Guide](images/guide.png)');
    expect(result.markdown).not.toMatch(/javascript:|data:image/i);
    expect(result.warnings.find((warning) => warning.code === 'unsafe-url-removed')?.count).toBe(3);
  });

  it('recognizes safe and obfuscated unsafe URL policies directly', () => {
    expect(isSafeConversionUrl('https://example.com', 'link')).toBe(true);
    expect(isSafeConversionUrl('../post', 'link')).toBe(true);
    expect(isSafeConversionUrl('#answer', 'link')).toBe(true);
    expect(isSafeConversionUrl('mailto:test@example.com', 'link')).toBe(true);
    expect(isSafeConversionUrl('//example.com/file', 'image')).toBe(false);
    expect(isSafeConversionUrl('java\nscript:alert(1)', 'link')).toBe(false);
    expect(isSafeConversionUrl('&#x6a;avascript:alert(1)', 'link')).toBe(false);
    expect(isSafeConversionUrl('blob:https://example.com/id', 'image')).toBe(false);
  });

  it('removes active content and gives Turndown no live resource attributes', () => {
    const html = `
      <!-- comment --><script>alert(1)</script><style>body{background:url(x)}</style>
      <iframe src="https://example.com"></iframe><img src="https://example.com/x.png" srcset="x 2x" onerror="alert(1)">
      <a href="https://example.com" onclick="alert(1)">Safe</a>
    `;
    const sanitized = inspectSanitizedHtml(html);
    const result = convertHtmlToMarkdown(html);

    expect(sanitized).not.toMatch(/<script|<style|<iframe|<!--|onerror|onclick|\ssrc=|srcset=|\shref=/i);
    expect(sanitized).toContain('data-md-src="https://example.com/x.png"');
    expect(sanitized).toContain('data-md-href="https://example.com"');
    expect(result.markdown).toContain('![ ]'.replace(' ', ''));
    expect(result.markdown).not.toContain('alert(1)');
    expect(result.warnings.some((warning) => warning.code === 'blocked-content-removed')).toBe(true);
  });

  it('preserves code text, detects language, and chooses a safe fence', () => {
    const result = convertHtmlToMarkdown('<pre><code class="language-js">const x = `a`;\nconst fence = ```;</code></pre>');
    expect(result.markdown).toMatch(/^````js/m);
    expect(result.markdown).toContain('const x = `a`;');
    expect(result.markdown).toContain('const fence = ```;');
  });

  it('converts simple tables and warns about merged cells', () => {
    const simple = convertHtmlToMarkdown('<table><thead><tr><th>Name</th><th>Score</th></tr></thead><tbody><tr><td>Alpha</td><td>98</td></tr></tbody></table>');
    expect(simple.markdown).toContain('| Name');
    expect(simple.markdown).toContain('| Alpha');
    expect(simple.warnings).toHaveLength(0);

    const complex = convertHtmlToMarkdown('<table><tr><th colspan="2">Group</th></tr><tr><td>A</td><td>B</td></tr></table>');
    expect(complex.warnings.some((warning) => warning.code === 'complex-table-flattened')).toBe(true);
  });

  it('unwraps unsupported elements with a visible warning', () => {
    const result = convertHtmlToMarkdown('<article><custom-card><p>Readable content</p></custom-card></article>');
    expect(result.markdown).toBe('Readable content');
    expect(result.warnings).toContainEqual({
      code: 'unsupported-element-unwrapped',
      count: 1,
      message: '1 unsupported HTML element was unwrapped while its readable text was kept.',
    });
  });

  it('decodes entities, normalizes CRLF, and is deterministic', () => {
    const html = '<p>Caf&eacute; &amp; tea</p>\r\n\r\n\r\n<p>第二段</p>';
    const first = convertHtmlToMarkdown(html);
    const second = convertHtmlToMarkdown(html);
    expect(first).toEqual(second);
    expect(first.markdown).toBe('Café & tea\n\n第二段');
  });

  it('rejects empty and oversized input', () => {
    expect(() => convertHtmlToMarkdown('   ')).toThrow();
    expect(() => convertHtmlToMarkdown('x'.repeat(HTML_TO_MARKDOWN_LIMITS.maxInputLength + 1))).toThrow();
    expect(() => convertHtmlToMarkdown(`<p>${'x'.repeat(12_001)}</p>`)).toThrow();
  });

  it('produces Markdown that uses the shared render pipeline', () => {
    const result = convertHtmlToMarkdown('<h2>Preview</h2><table><tr><th>A</th></tr><tr><td>B</td></tr></table>');
    const rendered = renderResult(result.markdown);
    expect(rendered.html).toContain('<h2>Preview</h2>');
    expect(rendered.html).toContain('<table>');
  });
});
