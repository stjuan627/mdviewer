import { expect, test, type Page } from '@playwright/test';

async function replaceMarkdown(page: Page, markdown: string) {
  const editor = page.getByTestId('markdown-input').locator('.cm-content');
  await editor.click();
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await page.keyboard.type(markdown);
}

test('viewer -> article -> share flow works', async ({ page, context }) => {
  await page.goto('/markdown-viewer');

  await page.getByRole('button', { name: '进入 Workbench' }).click();
  await page.waitForURL(/\/\?source=markdown-viewer/);

  await expect(page.getByTestId('preview-frame')).toContainText('Markdown Box v0.1');

  await page.getByTestId('create-share').click();
  await expect(page.getByTestId('workbench-notice')).toContainText('分享链接已创建');

  const href = await page.getByTestId('open-share').getAttribute('href');
  expect(href).toBeTruthy();

  const sharePage = await context.newPage();
  await sharePage.goto(href!);

  await expect(sharePage.getByTestId('share-frame')).toContainText('Markdown Box v0.1');
  await expect(sharePage.getByRole('link', { name: '返回工作台继续编辑' })).toBeVisible();
});

test('legacy view param is ignored and preview stays pure', async ({ page }) => {
  await page.goto('/?view=invalid');

  await expect(page.getByTestId('preview-frame')).toContainText('Markdown Box v0.1');
  await expect(page.getByTestId('preview-frame')).not.toContainText('Release notes');
});

test('home raw source already contains server-rendered preview html', async ({ request }) => {
  const response = await request.get('/');
  const html = await response.text();

  expect(html).toContain('data-testid="preview-frame"');
  expect(html).toContain('<h1>Markdown Box v0.1</h1>');
  expect(html).toContain('<li>单一内容源</li>');
});

test('payload overflow falls back to default example', async ({ page }) => {
  const payload = 'x'.repeat(4000);
  await page.goto(`/?payload=${payload}`);

  await expect(page.getByTestId('workbench-notice')).toContainText('已回落到默认示例');
  await expect(page.getByTestId('markdown-input')).toContainText('Markdown Box v0.1');
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
