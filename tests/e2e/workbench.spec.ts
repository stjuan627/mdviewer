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

  await expect(page.getByTestId('preview-frame')).toContainText('Online Markdown Viewer with Live Preview');
  await expect(page.getByTestId('preview-frame')).not.toContainText('Markdown Workbench');
});

test('home raw source already contains server-rendered preview html', async ({ request }) => {
  const response = await request.get('/');
  const html = await response.text();

  expect(html).toContain('lang="en"');
  expect(html).toContain('rel="alternate" hreflang="fr"');
  expect(html).toContain('rel="alternate" hreflang="de"');
  expect(html).toContain('rel="alternate" hreflang="zh-CN"');
  expect(html).toContain('rel="alternate" hreflang="ko"');
  expect(html).toContain('href="https://mdviewer.net/fr"');
  expect(html).toContain('href="https://mdviewer.net/ko"');
  expect(html).toContain('data-testid="preview-frame"');
  expect(html).toContain('<title>Online Markdown Viewer with Live Preview - MD Viewer</title>');
  expect(html).toContain('<h2>Online Markdown Viewer with Live Preview</h2>');
  expect(html).toContain('<h2>A markdown viewer that gets the rendering right</h2>');
});

test('sitemap exposes fr alternates for localized landing pages', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  const xml = await response.text();

  expect(xml).toContain('<loc>https://mdviewer.net/markdown-to-pdf</loc>');
  expect(xml).toContain('hreflang="fr" href="https://mdviewer.net/fr/markdown-to-pdf"');
  expect(xml).toContain('hreflang="de" href="https://mdviewer.net/de/markdown-to-pdf"');
  expect(xml).toContain('hreflang="x-default" href="https://mdviewer.net/markdown-to-pdf"');
});

test('zh-cn route exposes localized metadata and content', async ({ request }) => {
  const response = await request.get('/zh-cn/markdown-to-pdf');
  const html = await response.text();

  expect(html).toContain('lang="zh-CN"');
  expect(html).toContain('https://mdviewer.net/zh-cn/markdown-to-pdf');
  expect(html).toContain('Markdown 转 PDF');
});

test('fr route exposes localized metadata and content', async ({ request }) => {
  const response = await request.get('/fr/markdown-to-html');
  const html = await response.text();

  expect(html).toContain('lang="fr"');
  expect(html).toContain('https://mdviewer.net/fr/markdown-to-html');
  expect(html).toContain('Convertisseur Markdown vers HTML');
});

test('de markdown-to-image route exposes localized metadata and image-first positioning', async ({ request }) => {
  const response = await request.get('/de/markdown-to-image');
  const html = await response.text();

  expect(html).toContain('lang="de"');
  expect(html).toContain('https://mdviewer.net/de/markdown-to-image');
  expect(html).toContain('Markdown to Image');
  expect(html).toContain('Markdown-zu-Bild-Generator');
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

  await expect(page.getByTestId('workbench-notice')).toContainText('Fell back to the default sample');
  await expect(page.getByTestId('markdown-input')).toContainText('Online Markdown Viewer with Live Preview');
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

test('latex, gemoji, and footnotes render consistently in preview, copy, and share', async ({ page, context, request }) => {
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

  const shareResponse = await request.post('/api/share', {
    data: {
      markdown,
      themeId: 'paper',
    },
  });
  expect(shareResponse.ok()).toBeTruthy();
  const sharePayload = await shareResponse.json();
  expect(sharePayload.shareUrl).toBeTruthy();

  const sharePage = await context.newPage();
  await sharePage.goto(sharePayload.shareUrl);

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
  await page.getByRole('menuitem', { name: /Français/i }).click();

  await expect(page).toHaveURL('/fr/markdown-to-pdf?theme=blueprint');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
});

test('markdown table generator exposes English-only SEO and sitemap entries', async ({ request }) => {
  const response = await request.get('/markdown-table-generator');
  const html = await response.text();

  expect(response.ok()).toBeTruthy();
  expect(html).toContain('<title>Markdown Table Generator - Create GFM Tables Online | MD Viewer</title>');
  expect(html).toContain('rel="canonical" href="https://mdviewer.net/markdown-table-generator"');
  expect(html).not.toContain('rel="alternate" hreflang=');
  expect(html).toContain('"@type":"SoftwareApplication"');
  expect(html).toContain('"@type":"FAQPage"');

  const sitemapResponse = await request.get('/sitemap.xml');
  const sitemap = await sitemapResponse.text();
  const routeEntries = sitemap.match(/<loc>https:\/\/mdviewer\.net\/markdown-table-generator<\/loc>/g) ?? [];
  const toolEntry = sitemap.match(/<url><loc>https:\/\/mdviewer\.net\/markdown-table-generator<\/loc>[\s\S]*?<\/url>/)?.[0];

  expect(routeEntries).toHaveLength(1);
  expect(toolEntry).toBe('<url><loc>https://mdviewer.net/markdown-table-generator</loc></url>');
});

test('markdown table grid edits, aligns, and renders through the live preview', async ({ page }) => {
  await page.goto('/markdown-table-generator');

  await expect(page.getByTestId('table-cell-0-0')).toHaveValue('Name');
  await expect(page.getByTestId('markdown-output')).toContainText('| Name');

  await page.getByRole('button', { name: 'Add row' }).click();
  await expect(page.getByTestId('table-cell-3-0')).toBeVisible();
  await page.getByRole('button', { name: 'Add column' }).click();
  await expect(page.getByTestId('table-cell-0-3')).toBeVisible();
  await page.getByRole('button', { name: 'Remove row 3' }).click();
  await page.getByRole('button', { name: 'Remove column 4' }).click();
  await expect(page.getByTestId('table-cell-3-0')).toHaveCount(0);
  await expect(page.getByTestId('table-cell-0-3')).toHaveCount(0);

  await page.getByTestId('table-cell-0-0').fill('Project');
  await page.getByLabel('Alignment for column 1').selectOption('right');
  await expect(page.getByTestId('markdown-output')).toContainText('| Project');
  await expect(page.getByTestId('markdown-output')).toContainText('| ------:');

  await page.getByRole('tab', { name: 'Preview' }).click();
  await expect(page.getByTestId('table-preview')).toContainText('Project');
  await expect(page.getByTestId('table-preview').locator('table')).toHaveCount(1);

  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(page.getByTestId('table-cell-0-0')).toHaveValue('');
  await expect(page.getByTestId('table-cell-1-0')).toHaveValue('');
});

test('markdown table generator imports CSV, copies, downloads, and hands off without a query payload', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/markdown-table-generator');

  await page.getByRole('button', { name: 'Import CSV / TSV' }).click();
  await page.getByTestId('table-import-input').fill('Tool,"Best for",Private\nMD Viewer,"README, docs",Yes\nSheets,"Planning, data",Local');
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByTestId('table-import-submit').click();

  await expect(page.getByTestId('table-cell-1-1')).toHaveValue('README, docs');
  await page.getByTestId('copy-markdown').click();
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain('| MD Viewer');
  await expect(page.getByTestId('table-generator-status')).toContainText('copied');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download .md' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('markdown-table.md');

  await page.getByTestId('open-in-viewer').click();
  await expect(page).toHaveURL('/');
  expect(new URL(page.url()).search).toBe('');
  await expect(page.getByTestId('markdown-input')).toContainText('MD Viewer');
  await expect(page.getByTestId('preview-frame').locator('table')).toHaveCount(1);
});

test('spreadsheet paste expands the grid and mobile layout avoids document overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/markdown-table-generator');

  await page.getByTestId('table-cell-1-0').focus();
  await page.evaluate(async () => {
    const input = document.querySelector('[data-testid="table-cell-1-0"]') as HTMLInputElement;
    const data = new DataTransfer();
    data.setData('text/plain', 'Alpha\tReady\nBeta\tBlocked');
    input.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
  });

  await expect(page.getByTestId('table-cell-2-1')).toHaveValue('Blocked');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});

test('HTML to Markdown exposes English-only SEO, matching schema, and one sitemap entry', async ({ request }) => {
  const response = await request.get('/html-to-markdown');
  const html = await response.text();

  expect(response.ok()).toBeTruthy();
  expect(html).toContain('<title>HTML to Markdown Converter - Clean GFM Online | MD Viewer</title>');
  expect(html).toContain('rel="canonical" href="https://mdviewer.net/html-to-markdown"');
  expect(html).not.toContain('rel="alternate" hreflang=');
  expect(html).toContain('"@type":"SoftwareApplication"');
  expect(html).toContain('"@type":"FAQPage"');
  expect(html).toContain('Can this tool convert a webpage URL directly?');

  const sitemap = await (await request.get('/sitemap.xml')).text();
  const entries = sitemap.match(/<loc>https:\/\/mdviewer\.net\/html-to-markdown<\/loc>/g) ?? [];
  const toolEntry = sitemap.match(/<url><loc>https:\/\/mdviewer\.net\/html-to-markdown<\/loc>[\s\S]*?<\/url>/)?.[0];
  expect(entries).toHaveLength(1);
  expect(toolEntry).toBe('<url><loc>https://mdviewer.net/html-to-markdown</loc></url>');
});

test('HTML converter handles a local file, warnings, preview, copy, download, and viewer handoff', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/html-to-markdown');

  await page.getByTestId('html-file-input').setInputFiles({
    name: 'cms-export.html',
    mimeType: 'text/html',
    buffer: Buffer.from('<h1>CMS Guide</h1><script>alert(1)</script><p><a href="javascript:alert(2)">Unsafe</a> <strong>clean text</strong></p><pre><code class="language-ts">const answer: number = 42;</code></pre><table><tr><th>Tool</th><th>Use</th></tr><tr><td>MD Viewer</td><td>Docs</td></tr></table>'),
  });
  await page.getByTestId('convert-html').click();

  await expect(page.getByTestId('markdown-output')).toContainText('# CMS Guide');
  await expect(page.getByTestId('markdown-output')).toContainText('```ts');
  await expect(page.getByTestId('markdown-output')).toContainText('| Tool');
  await expect(page.getByTestId('markdown-output')).not.toContainText('javascript:');
  await expect(page.getByTestId('markdown-output')).not.toContainText('alert(1)');
  await expect(page.getByTestId('conversion-warnings')).toContainText('removed');

  await page.getByRole('tab', { name: 'Preview' }).click();
  await expect(page.getByTestId('html-conversion-preview')).toContainText('CMS Guide');
  await expect(page.getByTestId('html-conversion-preview').locator('table')).toHaveCount(1);
  await expect(page.getByTestId('html-conversion-preview').locator('script')).toHaveCount(0);

  await page.getByTestId('copy-markdown').click();
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toContain('# CMS Guide');
  expect(clipboard).not.toContain('javascript:');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download .md' }).click();
  expect((await downloadPromise).suggestedFilename()).toBe('converted-markdown.md');

  await page.getByTestId('open-in-viewer').click();
  await expect(page).toHaveURL('/');
  expect(new URL(page.url()).search).toBe('');
  await expect(page.getByTestId('markdown-input')).toContainText('CMS Guide');
});

test('HTML converter retains the previous result after failure and fits mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/html-to-markdown');
  await page.getByTestId('convert-html').click();
  const previous = await page.getByTestId('markdown-output').inputValue();

  await page.getByTestId('html-input').fill('');
  await page.getByTestId('convert-html').click();
  await expect(page.getByTestId('html-converter-status')).toContainText('previous result is still shown');
  await expect(page.getByTestId('markdown-output')).toHaveValue(previous);
  await page.getByTestId('open-in-viewer').click();
  await expect(page).toHaveURL('/html-to-markdown');
  await expect(page.getByTestId('html-converter-status')).toContainText('Convert the current HTML successfully');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});
