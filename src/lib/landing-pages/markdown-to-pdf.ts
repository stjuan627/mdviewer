import { markdownToPdfInitialMarkdown } from '@/lib/landing-pages/content/markdown-to-pdf';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToPdfTitle = 'Markdown to PDF Converter — Free Online MD to PDF Export';
const markdownToPdfDescription = 
  'Free online Markdown to PDF converter. Paste or upload .md, preview GFM tables, code, LaTeX math, and Mermaid, then export a polished PDF — no install.';

const markdownToPdfFaqItems: LandingSectionFaqItem[] = [
  {
    question: 'Do I need to install anything to convert Markdown to PDF?',
    answer:
      'No installation is required. This Markdown to PDF converter runs entirely in your browser — no desktop app, no CLI, no Pandoc or wkhtmltopdf setup. Paste your Markdown, review the preview, and click Export PDF.',
  },
  {
    question: 'Are my Markdown files uploaded to a server?',
    answer:
      'No. Markdown rendering and PDF export happen locally in your browser. Your content stays on your device unless you explicitly create a public share link.',
  },
  {
    question: 'Does the exported PDF have selectable, searchable text?',
    answer:
      'Yes. The PDF contains real, selectable, searchable text — not a flattened image — so reviewers can copy paragraphs, annotate the document, and run full-text search inside the file.',
  },
  {
    question: 'Does the PDF preserve code syntax highlighting?',
    answer:
      'Yes. Fenced code blocks keep language-aware syntax highlighting in the exported PDF. The same highlighting you see in the live Markdown preview is what ends up in the file.',
  },
  {
    question: 'Can I export Markdown with LaTeX math and Mermaid diagrams to PDF?',
    answer:
      'Yes. KaTeX-rendered LaTeX equations and Mermaid diagrams render as crisp SVG in the preview and survive the conversion to PDF, so academic and technical documents export cleanly.',
  },
  {
    question: 'Can I customize page size and margins (A4, Letter, Legal)?',
    answer:
      'Yes. When the browser print dialog opens during Export PDF, choose paper size (Letter, A4, Legal), orientation, and margin preset before saving the PDF.',
  },
  {
    question: 'Can I upload a .md file instead of pasting text?',
    answer:
      'Yes. The workbench accepts uploaded \`.md\`, \`.markdown\`, and plain text files. Drop a Markdown file in, verify the rendered preview, and export the PDF.',
  },
  {
    question: 'How is this different from Pandoc, Typora, or wkhtmltopdf?',
    answer:
      'Pandoc and wkhtmltopdf are CLI tools that need a local install and configuration. Typora is a paid desktop app. This Markdown to PDF converter is free, runs in any browser, supports GFM, LaTeX, and Mermaid out of the box, and finishes a one-off export in under a minute.',
  },
];

export const markdownToPdfLandingPage: LandingPageConfig = {
  locale: 'en',
  slug: 'markdown-to-pdf',
  path: '/markdown-to-pdf',
  prerender: true,
  title: markdownToPdfTitle,
  description: markdownToPdfDescription,
  heroTitle: 'Markdown to PDF Converter',
  // heroDescription: 'Paste Markdown or upload a .md file, review the live preview, and export a polished PDF. GFM tables, code blocks with syntax highlighting, LaTeX math, and Mermaid diagrams all carry into the PDF. No signup, no install, no upload to a server.',
  initialMarkdown: markdownToPdfInitialMarkdown,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToPdfTitle,
        description: markdownToPdfDescription,
        path: '/markdown-to-pdf',
      },
      [
        'Markdown to PDF converter',
        'MD to PDF',
        'Convert Markdown to PDF online',
        'Free Markdown to PDF',
        '.md to PDF export',
        'Markdown PDF export with LaTeX math',
        'Markdown PDF export with Mermaid diagrams',
        'GFM Markdown to PDF',
        'Syntax-highlighted code blocks in PDF',
        'Live Markdown preview before PDF export',
        'Browser-based Markdown PDF converter',
        'No-install Markdown to PDF',
      ]
    ),
    ...buildFaqSchema(markdownToPdfFaqItems),
  ],
  workbenchVariant: {
    exportOptions: ['pdf'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown to PDF — frequently asked questions',
      description:
        'The practical concerns people raise before using a browser-based Markdown to PDF converter.',
      faqItems: markdownToPdfFaqItems,
    },
  ],
};
