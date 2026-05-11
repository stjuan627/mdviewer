import { expect, test } from '@playwright/test';

test('viewer -> article -> share flow works', async ({ page, context }) => {
  await page.goto('/markdown-viewer');

  await page.getByRole('button', { name: '进入 Article workbench' }).click();
  await page.waitForURL(/\/workbench\/?\?view=article/);

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

test('invalid view falls back and release tab updates preview', async ({ page }) => {
  await page.goto('/workbench?view=invalid');

  await expect(page.getByText('当前视图：Article')).toBeVisible();
  await page.getByTestId('view-tab-release').click();
  await expect(page.getByText('当前视图：Release')).toBeVisible();
  await expect(page.getByTestId('preview-frame')).toContainText('Release notes');
});

test('payload overflow falls back to default example', async ({ page }) => {
  const payload = 'x'.repeat(4000);
  await page.goto(`/workbench?view=article&payload=${payload}`);

  await expect(page.getByTestId('workbench-notice')).toContainText('已回落到默认示例');
  await expect(page.getByTestId('markdown-input')).toHaveValue(/Markdown Box v0.1/);
});

test('malicious markdown is sanitized in preview', async ({ page }) => {
  await page.goto('/workbench?view=article');
  await page.getByTestId('markdown-input').fill('# Safe\n\n<script>alert(1)</script>\n\n[a](javascript:alert(1))\n\n<img src="https://example.com/x.png" onerror="alert(1)" />');

  const preview = page.getByTestId('preview-frame');

  await expect(preview).toContainText('Safe');
  await expect(preview.locator('script')).toHaveCount(0);
  await expect(preview.locator('[onclick], [onerror]')).toHaveCount(0);
  await expect(preview.locator('a[href^="javascript:"]')).toHaveCount(0);
});
