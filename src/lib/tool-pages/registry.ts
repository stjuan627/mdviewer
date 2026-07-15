import { buildFaqSchema } from '@/lib/landing-pages/shared';
import type { LandingSectionFaqItem } from '@/lib/landing-pages/types';
import type { ToolPageConfig, ToolPageSlug } from '@/lib/tool-pages/types';

const title = 'Markdown Table Generator - Create GFM Tables Online | MD Viewer';
const description =
  'Create Markdown tables in a visual grid, import CSV or TSV, set column alignment, preview the result, and copy clean GFM. Free and browser-based.';

const faqItems: LandingSectionFaqItem[] = [
  {
    question: 'Does this Markdown table generator support GitHub Flavored Markdown?',
    answer:
      'Yes. It generates GitHub Flavored Markdown pipe tables with a header row, a delimiter row, and left, center, or right column alignment. The output works in GitHub READMEs, issues, pull requests, and other GFM-compatible editors.',
  },
  {
    question: 'Can I paste a table from Excel or Google Sheets?',
    answer:
      'Yes. Copy a cell range from Excel, Google Sheets, Numbers, or LibreOffice and paste it into any grid cell. Tab-separated rows and columns expand the editable grid automatically, up to the page limits.',
  },
  {
    question: 'Can I convert CSV or TSV to a Markdown table?',
    answer:
      'Yes. Use Import CSV / TSV to convert comma-separated or tab-separated data into an editable Markdown table. Quoted CSV fields, empty cells, commas inside quoted values, and CRLF line endings are supported.',
  },
  {
    question: 'Does my table data leave the browser?',
    answer:
      'No. Grid editing, CSV and TSV parsing, Markdown generation, preview, copy, and download all run in your browser. Data is only handed to the main Markdown viewer when you explicitly choose Open in Markdown Viewer.',
  },
  {
    question: 'How are pipe characters escaped in Markdown table cells?',
    answer:
      'A pipe inside a cell is written as an escaped pipe, \\|, so a GFM renderer treats it as cell content instead of a column boundary. Pipes that are already escaped are left unchanged.',
  },
  {
    question: 'Can I open the generated table in the Markdown viewer?',
    answer:
      'Yes. Open in Markdown Viewer sends the validated Markdown table directly to the main workbench without placing the table data in the URL. You can continue editing the surrounding document there.',
  },
];

const markdownTableGenerator: ToolPageConfig = {
  slug: 'markdown-table-generator',
  path: '/markdown-table-generator',
  title,
  description,
  heroTitle: 'Markdown Table Generator',
  heroDescription:
    'Build clean Markdown tables visually. Paste spreadsheet data, adjust alignment, preview the result, and copy ready-to-use GFM.',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Markdown Table Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: 'https://mdviewer.net/markdown-table-generator',
      description,
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Visual Markdown table editor',
        'CSV to Markdown table conversion',
        'TSV and spreadsheet paste',
        'GitHub Flavored Markdown column alignment',
        'Live rendered table preview',
        'Copy and download Markdown',
        'Browser-only processing',
      ],
    },
    ...buildFaqSchema(faqItems),
  ],
  references: [
    {
      label: 'GitHub Docs: Organizing information with tables',
      href: 'https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables',
    },
    {
      label: 'GitHub Flavored Markdown specification: Tables extension',
      href: 'https://github.github.com/gfm/#tables-extension-',
    },
  ],
  sections: [
    {
      id: 'visual-editor',
      kicker: 'Visual table maker',
      title: 'Create a Markdown table without hand-writing pipes',
      description:
        'Use the spreadsheet-style grid to edit headers and cells directly. The Markdown table generator writes the pipes, delimiter row, spacing, and escaping while you focus on the data.',
      columns: 2,
      cards: [
        {
          title: 'Build and reshape the grid',
          items: [
            'Start with the sample, clear it, or add rows and columns as the table grows.',
            'Remove individual rows or columns without rewriting the rest of the Markdown table.',
          ],
        },
        {
          title: 'Copy readable Markdown',
          items: [
            'Cell widths are padded so the raw GFM source remains easy to review in a README or docs repository.',
            'Inline Markdown such as links, code spans, and bold text remains available inside cells.',
          ],
        },
      ],
    },
    {
      id: 'csv-spreadsheet',
      kicker: '',
      title: 'Paste CSV or spreadsheet data',
      description:
        'Convert CSV to a Markdown table, import TSV, or paste cells directly from Excel and Google Sheets. The first imported row becomes the header and short rows are padded with empty cells.',
      columns: 3,
      cards: [
        {
          title: 'CSV to Markdown',
          items: ['Handles quoted commas, quote characters, empty cells, embedded line breaks, and CRLF files.'],
        },
        {
          title: 'TSV and spreadsheet paste',
          items: ['Tab-separated clipboard data fills the grid from the selected cell and expands it when needed.'],
        },
        {
          title: 'Private by default',
          items: ['Parsing and table generation run locally. The tool does not upload or save your table data.'],
        },
      ],
    },
    {
      id: 'gfm-alignment',
      kicker: '',
      title: 'Control GFM column alignment',
      description:
        'GitHub Flavored Markdown uses colons in the delimiter row to set alignment. Choose left, center, or right for each column and the generated source updates immediately.',
      columns: 3,
      cards: [
        { title: 'Left', description: 'Uses `:---` for labels and natural reading order.', items: ['Good for names, descriptions, and text.'] },
        { title: 'Center', description: 'Uses `:---:` to center compact values.', items: ['Good for status, category, or yes/no values.'] },
        { title: 'Right', description: 'Uses `---:` to align content to the right.', items: ['Good for numbers, prices, ranks, and scores.'] },
      ],
    },
    {
      id: 'preview-copy',
      kicker: 'Verify the output',
      title: 'Preview the Markdown table before you copy',
      description:
        'Switch between copy-ready source and the rendered result. The preview uses the same GFM rendering pipeline as MD Viewer, so the table you inspect is the table you hand off.',
      columns: 2,
      cards: [
        {
          title: 'Use it in documentation',
          items: ['Copy the table into a GitHub README, issue, pull request, wiki, static-site page, or GFM-compatible editor.'],
        },
        {
          title: 'Continue in MD Viewer',
          items: ['Open the table in the main Markdown viewer without exposing the source in a query string.'],
        },
      ],
    },
    {
      id: 'faq',
      kicker: '',
      title: 'Markdown table generator FAQ',
      description: 'Direct answers about GFM syntax, CSV import, spreadsheet paste, privacy, and the Markdown viewer handoff.',
      faqItems,
    },
  ],
};

const htmlToMarkdownDescription =
  'Convert HTML to clean Markdown online in your browser. Preserve headings, links, lists, code blocks, and GFM tables, then preview, copy, or download the result.';

const htmlToMarkdownFaq: LandingSectionFaqItem[] = [
  {
    question: 'How do I convert HTML to Markdown online?',
    answer:
      'Paste an HTML fragment or open a local .html or .htm file, then select Convert to Markdown. The converter creates clean GitHub Flavored Markdown that you can preview, copy, download, or continue editing in MD Viewer.',
  },
  {
    question: 'Which HTML elements are supported?',
    answer:
      'Headings, paragraphs, emphasis, links, images, ordered and unordered lists, blockquotes, inline code, fenced code blocks, horizontal rules, simple tables, strikethrough, and task-list checkboxes are converted when Markdown can represent them.',
  },
  {
    question: 'Does the HTML to Markdown converter support tables?',
    answer:
      'Yes. Simple rectangular HTML tables become GitHub Flavored Markdown tables. Markdown has no rowspan or colspan syntax, so merged cells are flattened and the converter shows an honest warning.',
  },
  {
    question: 'Are scripts, styles, and unsafe links removed?',
    answer:
      'Yes. Scripts, styles, frames, forms, event handlers, live resource attributes, and unsafe URL schemes are removed before conversion. The raw HTML is never mounted as a page preview.',
  },
  {
    question: 'Does my HTML leave the browser?',
    answer:
      'No. HTML sanitization, conversion, Markdown preview, copy, and download all run locally in your browser. The page has no conversion API and does not upload your document.',
  },
  {
    question: 'Can this tool convert a webpage URL directly?',
    answer:
      'No. This converter does not fetch or scrape remote webpages. Copy the HTML you are allowed to use or save it as an .html file, then paste or open that local content.',
  },
  {
    question: 'Why can Markdown not preserve every CSS layout?',
    answer:
      'Markdown preserves document meaning rather than visual layout. Headings, lists, links, code, and simple tables transfer well, while columns, positioning, animations, and merged table cells have no direct Markdown equivalent.',
  },
];

const htmlToMarkdown: ToolPageConfig = {
  slug: 'html-to-markdown',
  path: '/html-to-markdown',
  title: 'HTML to Markdown Converter - Clean GFM Online | MD Viewer',
  description: htmlToMarkdownDescription,
  heroTitle: 'HTML to Markdown Converter',
  heroDescription:
    'Paste HTML and get clean, readable Markdown. Useful structure stays, scripts and styling go, and your content never leaves the browser.',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'HTML to Markdown Converter',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: 'https://mdviewer.net/html-to-markdown',
      description: htmlToMarkdownDescription,
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'Browser-based HTML to Markdown conversion',
        'GitHub Flavored Markdown tables and task lists',
        'Fenced code blocks with language hints',
        'Unsafe markup and URL removal',
        'Markdown source and rendered preview',
        'Copy and download Markdown',
      ],
    },
    ...buildFaqSchema(htmlToMarkdownFaq),
  ],
  references: [
    { label: 'GitHub Flavored Markdown specification', href: 'https://github.github.com/gfm/' },
    { label: 'Turndown HTML to Markdown converter', href: 'https://github.com/mixmark-io/turndown' },
  ],
  sections: [
    {
      id: 'readable-markdown',
      kicker: 'Clean conversion',
      title: 'Turn HTML into readable Markdown',
      description:
        'Convert HTML to Markdown online without carrying webpage layout code into your document. Paste a snippet or open a local HTML file, convert explicitly, and inspect the result before using it.',
      columns: 2,
      cards: [
        { title: 'Keep the meaning', items: ['Preserve headings, paragraphs, emphasis, links, images, lists, blockquotes, and horizontal rules.', 'Decode HTML entities and remove presentational indentation for cleaner source.'] },
        { title: 'Remove the noise', items: ['Drop scripts, styles, embeds, event handlers, and layout-only markup.', 'Block unsafe URL schemes before the HTML reaches browser DOM parsing.'] },
      ],
    },
    {
      id: 'gfm-structure',
      kicker: 'GitHub Flavored Markdown',
      title: 'Preserve the structure that matters',
      description:
        'The converter supports GFM tables, strikethrough, task lists, nested lists, and fenced code blocks. Language classes such as language-js are carried into the Markdown fence.',
      columns: 3,
      cards: [
        { title: 'Code blocks', items: ['Keep code text, indentation, backticks, and common language hints intact.'] },
        { title: 'Simple tables', items: ['Convert rectangular HTML tables into portable GFM pipe-table syntax.'] },
        { title: 'Honest warnings', items: ['See when unsafe content was removed or merged table cells had to be flattened.'] },
      ],
    },
    {
      id: 'cms-migration',
      kicker: 'Content migration',
      title: 'Clean up CMS and webpage exports',
      description:
        'Use clean Markdown when moving a WordPress or CMS export into a GitHub README, Astro, Hugo, Jekyll, Docusaurus, MkDocs, Obsidian, or another Markdown-based workflow.',
      columns: 2,
      cards: [
        { title: 'From rich HTML to editable text', items: ['Remove verbose wrappers while retaining the parts writers and developers need to edit.'] },
        { title: 'Private by default', items: ['Conversion happens in this browser tab. No account, upload, remote fetch, or server conversion is involved.'] },
      ],
    },
    {
      id: 'preview-conversion',
      kicker: 'Verify before reuse',
      title: 'Preview the converted Markdown',
      description:
        'Compare copy-ready Markdown source with its rendered result. The preview uses MD Viewer’s normal rendering pipeline, so you can verify tables, code, links, and document hierarchy before download or handoff.',
      columns: 2,
      cards: [
        { title: 'Copy or download', items: ['Copy clean Markdown to the clipboard or save a local .md file.'] },
        { title: 'Continue in MD Viewer', items: ['Open the validated result in the main viewer without placing document content in the URL.'] },
      ],
    },
    {
      id: 'faq',
      kicker: '',
      title: 'HTML to Markdown converter FAQ',
      description: 'Direct answers about supported HTML, GFM tables, safety, privacy, webpage URLs, and CSS limitations.',
      faqItems: htmlToMarkdownFaq,
    },
  ],
};

const toolPageConfigs: Partial<Record<ToolPageSlug, ToolPageConfig>> = {
  'markdown-table-generator': markdownTableGenerator,
  'html-to-markdown': htmlToMarkdown,
};

export function getToolPageConfig(slug: ToolPageSlug) {
  const config = toolPageConfigs[slug];
  if (!config) {
    throw new Error(`Tool page config not found: ${slug}`);
  }

  return config;
}

export const publishedToolPageConfigs = Object.values(toolPageConfigs).filter(
  (config): config is ToolPageConfig => Boolean(config)
);
