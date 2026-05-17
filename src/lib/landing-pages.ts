import { defaultMarkdown, markdownToPdfSampleMarkdown } from '@/lib/sample-markdown';

export type LandingSectionList = {
  title: string;
  description?: string;
  items: string[];
};

export type LandingSectionFaqItem = {
  question: string;
  answer: string;
};

export type LandingSection = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  columns?: 2 | 3;
  cards?: LandingSectionList[];
  faqItems?: LandingSectionFaqItem[];
};

export type WorkbenchExportOption = 'html' | 'pdf';

export type WorkbenchLandingVariant = {
  exportOptions: WorkbenchExportOption[];
};

export type LandingPageConfig = {
  slug: 'home' | 'markdown-viewer' | 'markdown-to-pdf';
  path: '/' | '/markdown-viewer' | '/markdown-to-pdf';
  prerender: boolean;
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  initialMarkdown: string;
  schema: Array<Record<string, unknown>>;
  workbenchVariant: WorkbenchLandingVariant;
  sections: LandingSection[];
};

const canonicalSiteUrl = 'https://mdviewer.net';

function buildAbsoluteUrl(path: LandingPageConfig['path']) {
  if (path === '/') {
    return canonicalSiteUrl;
  }

  return `${canonicalSiteUrl}${path}`;
}

function buildSoftwareSchema(config: Pick<LandingPageConfig, 'title' | 'description' | 'path'>, featureList: string[]) {
  const url = buildAbsoluteUrl(config.path);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'MD Viewer',
      url,
      description: config.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'MD Viewer',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url,
      description: config.description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList,
    },
  ];
}

export const landingPageConfigs: Record<LandingPageConfig['slug'], LandingPageConfig> = {
  home: {
    slug: 'home',
    path: '/',
    prerender: false,
    title: 'Online Markdown Viewer with Live Preview - MD Viewer',
    description:
      'Free online markdown viewer with live preview. Paste any README, RFC, or .md file to render GFM, LaTeX math, and Mermaid diagrams instantly. Copy clean HTML or share a public link.',
    heroTitle: 'Markdown Viewer with Live Preview',
    heroDescription:
      'Paste any markdown and see it rendered instantly — GFM, LaTeX, Mermaid, and code highlighting. Copy clean HTML, export PDF, or share a public link.',
    initialMarkdown: defaultMarkdown,
    schema: buildSoftwareSchema(
      {
        title: 'Online Markdown Viewer with Live Preview - MD Viewer',
        description:
          'Free online markdown viewer with live preview. Paste any README, RFC, or .md file to render GFM, LaTeX math, and Mermaid diagrams instantly. Copy clean HTML or share a public link.',
        path: '/',
      },
      [
        'Online Markdown viewer',
        'Live Markdown preview',
        'GFM, LaTeX, and Mermaid rendering',
        'PDF export',
        'Copy clean HTML output',
        'Share rendered Markdown pages',
      ]
    ),
    workbenchVariant: {
      exportOptions: ['html', 'pdf'],
    },
    sections: [],
  },
  'markdown-viewer': {
    slug: 'markdown-viewer',
    path: '/markdown-viewer',
    prerender: true,
    title: 'Markdown Viewer - MD Viewer',
    description: 'Preview Markdown, then open the full workbench with the same draft.',
    heroTitle: 'Preview Markdown, then move into the full workbench.',
    heroDescription:
      'This entry page stays focused on fast markdown viewing. When you need HTML export, PDF export, or a shareable page, continue into the full workbench with the same draft.',
    initialMarkdown: defaultMarkdown,
    schema: buildSoftwareSchema(
      {
        title: 'Markdown Viewer - MD Viewer',
        description: 'Preview Markdown, then open the full workbench with the same draft.',
        path: '/markdown-viewer',
      },
      [
        'Markdown viewer',
        'Open the full markdown workbench',
        'Client-side draft handoff into the workbench',
      ]
    ),
    workbenchVariant: {
      exportOptions: ['html', 'pdf'],
    },
    sections: [],
  },
  'markdown-to-pdf': {
    slug: 'markdown-to-pdf',
    path: '/markdown-to-pdf',
    prerender: true,
    title: 'Markdown to PDF Converter Online - MD Viewer',
    description:
      'Convert markdown to PDF online with live preview. Paste or upload Markdown, check the rendered layout, and export a polished PDF in your browser.',
    heroTitle: 'Convert Markdown to PDF in one browser tab',
    heroDescription:
      'Paste Markdown, review the rendered document, and export a clean PDF without reinstalling your workflow. Headings, tables, code blocks, and long-form notes stay readable from preview to download.',
    initialMarkdown: markdownToPdfSampleMarkdown,
    schema: buildSoftwareSchema(
      {
        title: 'Markdown to PDF Converter Online - MD Viewer',
        description:
          'Convert markdown to PDF online with live preview. Paste or upload Markdown, check the rendered layout, and export a polished PDF in your browser.',
        path: '/markdown-to-pdf',
      },
      [
        'Markdown to PDF converter',
        'Live markdown preview before PDF export',
        'Browser-based PDF export',
        'Upload markdown files and export polished PDFs',
      ]
    ),
    workbenchVariant: {
      exportOptions: ['pdf'],
    },
    sections: [
      {
        id: 'benefits',
        kicker: 'Why use it',
        title: 'A markdown to PDF workflow built for final review',
        description:
          'This page is for the common last-mile task: take working markdown, verify the layout, and download a PDF that is ready to send.',
        columns: 3,
        cards: [
          {
            title: 'Review before export',
            description: 'Check the rendered document before you commit to the file download.',
            items: [
              'See headings, lists, tables, quotes, and code blocks in the preview pane.',
              'Spot spacing issues before you export the PDF.',
            ],
          },
          {
            title: 'Stay in the browser',
            description: 'No desktop app or local build step is required for routine document exports.',
            items: [
              'Paste raw markdown or upload a `.md` file.',
              'Export the final PDF from the same workbench session.',
            ],
          },
          {
            title: 'Keep the source simple',
            description: 'One markdown source continues to drive the rendered output and the exported PDF.',
            items: [
              'Avoid rewriting the document in another editor.',
              'Preserve a predictable path from markdown to final attachment.',
            ],
          },
        ],
      },
      {
        id: 'steps',
        kicker: 'How it works',
        title: 'Paste, review, export',
        description:
          'The page keeps the interaction narrow so you can finish a PDF export quickly without switching tools.',
        columns: 3,
        cards: [
          {
            title: '1. Add your markdown',
            items: [
              'Paste a README, proposal, meeting note, or changelog.',
              'Upload an existing markdown file if you already have one.',
            ],
          },
          {
            title: '2. Verify the layout',
            items: [
              'Scan the rendered preview for page-ready structure.',
              'Check headings, tables, and code samples before exporting.',
            ],
          },
          {
            title: '3. Download the PDF',
            items: [
              'Use the export control in the workbench header.',
              'Download a PDF that is ready to share with teammates or clients.',
            ],
          },
        ],
      },
      {
        id: 'faq',
        kicker: 'FAQ',
        title: 'Questions about markdown to PDF exports',
        description:
          'These are the practical concerns people usually have before using a browser-based markdown to PDF tool.',
        faqItems: [
          {
            question: 'Can I preview my markdown before exporting the PDF?',
            answer:
              'Yes. The page embeds the full workbench so you can inspect the rendered output before you trigger the PDF export.',
          },
          {
            question: 'Do I need to install anything to convert markdown to PDF?',
            answer:
              'No. This workflow is designed to stay in the browser, so routine exports do not require a local app or CLI.',
          },
          {
            question: 'Can I upload a markdown file instead of pasting text?',
            answer:
              'Yes. The editor toolbar still supports uploading `.md`, `.markdown`, and plain text files before export.',
          },
          {
            question: 'Is the PDF export separate from the preview rendering?',
            answer:
              'No. The preview remains part of the same rendered markdown workflow, which keeps the export intent aligned with what you inspected on screen.',
          },
        ],
      },
    ],
  },
};

export function getLandingPageConfig(slug: LandingPageConfig['slug']) {
  return landingPageConfigs[slug];
}

export function resolveCanonicalUrl(path: LandingPageConfig['path'], site?: URL | string) {
  if (!site) {
    return buildAbsoluteUrl(path);
  }

  const base = typeof site === 'string' ? site : site.toString();

  if (path === '/') {
    return base;
  }

  return new URL(path, base).toString();
}
