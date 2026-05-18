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
      id: 'benefits',
      kicker: 'Why use it',
      title: 'A Markdown to PDF workflow built for final review',
      description:
        'Take working Markdown, verify the rendered layout, and download a PDF that is ready to send to clients, reviewers, or teammates — without leaving the browser.',
      columns: 3,
      cards: [
        {
          title: 'Review before you export',
          description:
            'See the exact PDF layout in a live Markdown preview before you commit to the download.',
          items: [
            'Inspect headings, lists, tables, quotes, and code blocks in the preview pane.',
            'Catch spacing or pagination issues before you export the PDF.',
            'No "PDF mode" surprises — the preview and the PDF share one render pipeline.',
          ],
        },
        {
          title: 'Stay in the browser',
          description:
            'No desktop app, no CLI, no Pandoc setup — convert Markdown to PDF in a single browser tab.',
          items: [
            'Paste raw Markdown or upload a `.md` file.',
            'Export the final PDF from the same workbench session.',
            'Works on macOS, Windows, Linux, and any modern mobile browser.',
          ],
        },
        {
          title: 'Keep your files private',
          description:
            'Markdown rendering and PDF export run locally — your document never leaves your device.',
          items: [
            'No upload to a third-party server during conversion.',
            'No account, no signup, no tracking required.',
            'Share links are opt-in, not the default flow.',
          ],
        },
      ],
    },
    {
      id: 'steps',
      kicker: 'How it works',
      title: 'How to convert Markdown to PDF in 3 steps',
      description:
        'The interaction is narrow on purpose so you can finish a Markdown-to-PDF export in under a minute, without tool switching.',
      columns: 3,
      cards: [
        {
          title: '1. Add your Markdown',
          items: [
            'Paste a README, proposal, meeting note, changelog, or RFC.',
            'Or upload an existing `.md` / `.markdown` file from disk.',
          ],
        },
        {
          title: '2. Verify the rendered preview',
          items: [
            'Scan the live preview for page-ready structure.',
            'Confirm tables, code blocks, LaTeX math, and Mermaid diagrams render correctly.',
          ],
        },
        {
          title: '3. Export the PDF',
          items: [
            'Click the **Export PDF** button in the workbench header.',
            'Pick paper size, orientation, and margins in the browser print dialog.',
            'Download a paginated PDF, ready to share with teammates or clients.',
          ],
        },
      ],
    },
    {
      id: 'use-cases',
      kicker: 'Use cases',
      title: 'What people use the Markdown to PDF converter for',
      description:
        'Anywhere Markdown is the source of truth but PDF is what actually gets sent, archived, or printed.',
      columns: 3,
      cards: [
        {
          title: 'Client-ready handouts',
          items: [
            'Convert a Markdown proposal into a PDF a client can open without a Markdown viewer.',
            'Export release notes, changelogs, or status reports for stakeholders.',
          ],
        },
        {
          title: 'Technical specs and RFCs',
          items: [
            'Archive design docs and RFCs as long-term-stable PDFs.',
            'Send a finalized spec to reviewers with code samples and diagrams intact.',
          ],
        },
        {
          title: 'Academic and research notes',
          items: [
            'Convert Markdown notes with LaTeX equations into PDF for submission.',
            'Export machine-learning READMEs or technical papers without screenshotting math.',
          ],
        },
        {
          title: 'Resumes and cover letters',
          items: [
            'Keep the source in Markdown, ship the PDF that recruiters expect.',
            'Re-export instantly after every edit, without reformatting in Word.',
          ],
        },
        {
          title: 'README → printable doc',
          items: [
            'Turn a GitHub README into a printable PDF onboarding doc.',
            'Preserve GFM tables, task lists, footnotes, and syntax-highlighted code.',
          ],
        },
        {
          title: 'Meeting notes and agendas',
          items: [
            'Convert a Markdown meeting note into a PDF attendees can save offline.',
            'Print a paginated agenda with predictable margins.',
          ],
        },
      ],
    },
    {
      id: 'comparison',
      kicker: 'Compared to',
      title: 'Markdown to PDF — browser converter vs. other tools',
      description:
        'For a one-off "I just need this Markdown as a PDF" task, a browser-based converter is almost always faster than CLI or desktop alternatives.',
      columns: 2,
      cards: [
        {
          title: 'vs. Pandoc',
          description: 'Pandoc is powerful but heavy.',
          items: [
            'Pandoc needs a CLI install plus a LaTeX distribution for PDF output.',
            'Mermaid and live preview require extra filters and config.',
            'This converter ships GFM, LaTeX, and Mermaid out of the box, no setup.',
          ],
        },
        {
          title: 'vs. wkhtmltopdf',
          description: 'wkhtmltopdf converts HTML, not Markdown.',
          items: [
            'You have to render Markdown to HTML yourself before wkhtmltopdf can use it.',
            'No live preview — you find out about layout issues after the export.',
            'This converter handles Markdown directly with a side-by-side preview.',
          ],
        },
        {
          title: 'vs. Typora',
          description: 'Typora is a paid desktop app.',
          items: [
            'Typora requires installing software and managing a license.',
            'Browser-based conversion avoids the install and works on any device.',
            'No vendor lock-in — your `.md` source stays portable.',
          ],
        },
        {
          title: 'vs. Word "Save as PDF"',
          description: 'Word does not understand Markdown.',
          items: [
            'You have to manually reformat Markdown in Word before saving as PDF.',
            'Code blocks, tables, math, and diagrams lose styling in translation.',
            'This converter preserves the Markdown structure straight into the PDF.',
          ],
        },
      ],
    },
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
