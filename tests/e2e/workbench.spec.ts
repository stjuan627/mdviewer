import { expect, test, type Page } from '@playwright/test';

async function replaceMarkdown(page: Page, markdown: string) {
  const editor = page.getByTestId('markdown-input').locator('.cm-content');
  await editor.click();
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await page.keyboard.insertText(markdown);
}

test('theme query drives preview theme', async ({ page }) => {
  await page.goto('/?theme=blueprint');

  await expect(page.getByTestId('preview-frame')).toHaveAttribute('data-theme', 'blueprint');
  await expect(page.getByTestId('theme-trigger')).toContainText('Blueprint');
});

test('legacy view param is ignored and preview stays pure', async ({ page }) => {
  await page.goto('/?view=invalid');

  await expect(page.getByTestId('preview-frame')).toContainText('Online Markdown Editor with Live Preview');
  await expect(page.getByTestId('preview-frame')).not.toContainText('Markdown Workbench');
});

test('home raw source already contains server-rendered preview html', async ({ request }) => {
  const response = await request.get('/');
  const html = await response.text();

  expect(html).toContain('lang="en"');
  expect(html).toContain('rel="alternate" hreflang="zh-CN"');
  expect(html).toContain('data-testid="preview-frame"');
  expect(html).toContain('<h1>Online Markdown Editor with Live Preview</h1>');
  expect(html).toContain('<h2>Why choose a browser-based markdown editor</h2>');
});

test('zh-cn route exposes localized metadata and content', async ({ request }) => {
  const response = await request.get('/zh-cn/markdown-to-pdf');
  const html = await response.text();

  expect(html).toContain('lang="zh-CN"');
  expect(html).toContain('https://mdviewer.net/zh-cn/markdown-to-pdf');
  expect(html).toContain('Markdown 转 PDF');
});

test('markdown-to-pdf route exposes pdf-only primary export intent', async ({ page, request }) => {
  const response = await request.get('/markdown-to-pdf');
  const html = await response.text();

  expect(html).toContain('Markdown to PDF Converter');
  expect(html).toContain('Markdown to PDF — frequently asked questions');
  expect(html).toContain('data-testid="preview-frame"');

  await page.goto('/markdown-to-pdf');
  await page.getByTestId('export-menu-trigger').click();

  await expect(page.getByTestId('quick-action-pdf')).toBeVisible();
  await expect(page.getByTestId('quick-action-image')).toHaveCount(0);
});

test('home route exposes PNG export and downloads a PNG file', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('export-menu-trigger').click();

  await expect(page.getByTestId('quick-action-pdf')).toBeVisible();
  await expect(page.getByTestId('quick-action-image')).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('quick-action-image').click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('mdviewer-export.png');
  await expect(page.getByTestId('workbench-notice')).toContainText('PNG downloaded.');
});

test('payload overflow falls back to default example', async ({ page }) => {
  const payload = 'x'.repeat(4000);
  await page.goto(`/?payload=${payload}`);

  await expect(page.getByTestId('workbench-notice')).toContainText('已回落到默认示例');
  await expect(page.getByTestId('markdown-input')).toContainText('Online Markdown Editor with Live Preview');
});

test('malicious markdown is sanitized in preview', async ({ page }) => {
  await page.goto('/');
  await replaceMarkdown(page, '# Safe\n\n<script>alert(1)</script>\n\n[a](javascript:alert(1))\n\n<img src="https://example.com/x.png" onerror="alert(1)" />');

  const preview = page.getByTestId('preview-frame');

  await expect(preview).toContainText('Safe');
  await expect(preview.locator('script')).toHaveCount(0);
  await expect(preview.locator('[onclick], [onerror]')).toHaveCount(0);
  await expect(preview.locator('a[href^="javascript:"]')).toHaveCount(0);
});

test('latex, gemoji, and footnotes render consistently in preview, copy, and share', async ({ page, context }) => {
  await page.goto('/');

  const markdown = [
    '# Feature check',
    '',
    'Launch status :rocket: with inline math $E = mc^2$.[^1]',
    '',
    '$$',
    '\\\\int_{0}^{\\\\infty} e^{-x^2} dx = \\\\frac{\\\\sqrt{\\\\pi}}{2}',
    '$$',
    '',
    '[^1]: Footnote content',
  ].join('\n');

  await replaceMarkdown(page, markdown);

  const preview = page.getByTestId('preview-frame');
  await expect(preview).toContainText('🚀');
  await expect(preview.locator('.katex')).toHaveCount(2);
  await expect(preview.locator('.footnotes')).toContainText('Footnote content');

  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByTestId('copy-html').click();
  const copiedHtml = await page.evaluate(() => navigator.clipboard.readText());
  expect(copiedHtml).toContain('class="katex"');
  expect(copiedHtml).toContain('class="footnotes"');
  expect(copiedHtml).toContain('🚀');

  await page.getByTestId('create-share').click();
  const href = await page.getByTestId('open-share').getAttribute('href');
  expect(href).toBeTruthy();

  const sharePage = await context.newPage();
  await sharePage.goto(href!);

  const shareFrame = sharePage.getByTestId('share-frame');
  await expect(shareFrame).toContainText('🚀');
  await expect(shareFrame.locator('.katex')).toHaveCount(2);
  await expect(shareFrame.locator('.footnotes')).toContainText('Footnote content');
});

test('browser print fallback can still open a populated preview page', async ({ page, context }) => {
  await page.goto('/');

  const markdown = [
    '# Print preview',
    '',
    'Browser print should open a populated preview page.',
  ].join('\n');

  await replaceMarkdown(page, markdown);

  const popupPromise = context.waitForEvent('page');
  await page.evaluate(() => {
    const payload = {
      title: 'MD Viewer PDF Print Preview',
      html: '<h1>Print preview</h1><p>Browser print should open a populated preview page.</p>',
      themeId: 'paper',
    };

    window.localStorage.setItem('mdviewer-browser-print-payload', JSON.stringify(payload));
    window.open('/print-preview?locale=en', '_blank', 'noopener,width=1200,height=1600');
  });
  const popup = await popupPromise;

  await popup.waitForLoadState('domcontentloaded');
  await expect(popup).toHaveURL(/\/print-preview\?locale=en$/);
  await expect(popup.locator('[data-print-preview-frame]')).not.toBeEmpty();
  await expect(popup.locator('[data-print-preview-status]')).not.toContainText('unavailable');
});

test('locale switcher preserves slug and query', async ({ page }) => {
  await page.goto('/markdown-to-pdf?theme=blueprint');
  await page.getByTestId('locale-switcher').click();
  await page.getByRole('menuitem', { name: /简体中文/i }).click();

  await expect(page).toHaveURL('/zh-cn/markdown-to-pdf?theme=blueprint');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
});
