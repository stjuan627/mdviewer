import { expect, test, type Page } from '@playwright/test';

async function replaceMarkdown(page: Page, markdown: string) {
  const editor = page.getByTestId('markdown-input').locator('.cm-content');
  await editor.click();
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await page.keyboard.insertText(markdown);
}

test('viewer -> article -> share flow works', async ({ page, context }) => {
  await page.goto('/markdown-viewer');

  await page.getByRole('button', { name: '进入 Workbench' }).click();
  await page.waitForURL(/\/\?source=markdown-viewer/);
  await expect(page.getByTestId('preview-frame')).toBeVisible();

  await expect(page.getByTestId('preview-frame')).toContainText('Online Markdown Editor with Live Preview');
  await page.locator('.theme-switcher-select').selectOption('nocturne');
  await expect(page.getByTestId('preview-frame')).toHaveAttribute('data-theme', 'nocturne');

  await page.getByTestId('create-share').click();
  await expect(page.getByTestId('workbench-notice')).toContainText('分享链接已创建');

  const href = await page.getByTestId('open-share').getAttribute('href');
  expect(href).toBeTruthy();

  const sharePage = await context.newPage();
  await sharePage.goto(href!);

  await expect(sharePage.getByTestId('share-frame')).toContainText('Online Markdown Editor with Live Preview');
  await expect(sharePage.getByTestId('share-frame')).toHaveAttribute('data-theme', 'nocturne');
  await expect(sharePage.getByRole('link', { name: '返回工作台继续编辑' })).toBeVisible();
});

test('theme query drives preview theme', async ({ page }) => {
  await page.goto('/?theme=blueprint');

  await expect(page.getByTestId('preview-frame')).toHaveAttribute('data-theme', 'blueprint');
  await expect(page.locator('.theme-switcher-select')).toHaveValue('blueprint');
});

test('legacy view param is ignored and preview stays pure', async ({ page }) => {
  await page.goto('/?view=invalid');

  await expect(page.getByTestId('preview-frame')).toContainText('Online Markdown Editor with Live Preview');
  await expect(page.getByTestId('preview-frame')).not.toContainText('Markdown Workbench');
});

test('home raw source already contains server-rendered preview html', async ({ request }) => {
  const response = await request.get('/');
  const html = await response.text();

  expect(html).toContain('data-testid="preview-frame"');
  expect(html).toContain('<h1>Online Markdown Editor with Live Preview</h1>');
  expect(html).toContain('<h2>Why choose a browser-based markdown editor</h2>');
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

test('export menu downloads pdf from the current themed preview', async ({ page }) => {
  await page.goto('/?theme=nocturne');

  const markdown = [
    '# PDF export',
    '',
    'Launch status :rocket: and preserve the selected theme.',
    '',
    '> Export should keep blockquotes readable.',
    '',
    '```ts',
    'console.log("pdf");',
    '```',
    '',
    '| Name | Value |',
    '| --- | --- |',
    '| Theme | Nocturne |',
  ].join('\n');

  await replaceMarkdown(page, markdown);
  await expect(page.getByTestId('preview-frame')).toHaveAttribute('data-theme', 'nocturne');

  await page.getByRole('button', { name: 'Export' }).click();

  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('download-pdf').click();
  await expect(page.getByText('Preparing PDF')).toBeVisible();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('mdviewer-export.pdf');
  await expect(page.getByTestId('workbench-notice')).not.toContainText('PDF export failed');
});
