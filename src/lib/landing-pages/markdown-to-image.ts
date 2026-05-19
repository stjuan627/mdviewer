import { markdownToImageInitialMarkdown } from '@/lib/landing-pages/content/markdown-to-image';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToImageTitle = 'Markdown to Image — Free Markdown Screenshot & PNG Generator';
const markdownToImageDescription =
  'Free Markdown to image generator. Turn Markdown — code, tables, math, Mermaid — into a clean PNG for Twitter/X, LinkedIn, Slack, GitHub, or slides. No watermark, no install, retina output.';

const markdownToImageFaqItems: LandingSectionFaqItem[] = [
  {
    question: 'How is this different from Carbon, ray.so, or polacode?',
    answer:
      'Carbon, ray.so, and polacode are designed around a single fenced code block. This Markdown to image generator renders full GitHub Flavored Markdown — headings, tables, task lists, blockquotes, LaTeX math, and Mermaid diagrams — and exports the entire rendered card as a PNG. If your snippet is more than just code, this is the Carbon alternative for it.',
  },
  {
    question: 'Can I export Markdown as a JPG or JPEG instead of PNG?',
    answer:
      'No, exports are PNG only, and that is intentional. Markdown content is mostly small text, syntax-highlighted code, and crisp table borders — exactly the kind of content where JPG compression introduces visible artifacts. PNG keeps text edges sharp and is universally accepted on Twitter/X, LinkedIn, Slack, Discord, GitHub, and Notion.',
  },
  {
    question: 'Does the exported image have a watermark or branding?',
    answer:
      'No. There is no watermark, no logo, and no signature burned into the PNG. The image you download is the rendered Markdown preview, nothing else. You can post it as your own asset.',
  },
  {
    question: 'Is the PNG high resolution / retina-ready?',
    answer:
      'Yes. The image is rasterized at 2× device pixels, which is retina-class density. Text stays crisp on high-DPI laptops, 4K displays, projected slides, and after social-platform recompression.',
  },
  {
    question: 'What happens if my Markdown is very long?',
    answer:
      'Long content auto-slices into multiple numbered PNG files (mdviewer-export-1.png, mdviewer-export-2.png, …) when a single canvas would exceed the browser rasterizer limit. You never lose the bottom of a long README or changelog to a silent truncation.',
  },
  {
    question: 'Can I pick a theme — light, dark, or technical — for the image?',
    answer:
      'Yes. Three presets ship with the workbench: Paper (warm editorial light theme), Blueprint (crisp high-contrast technical theme), and Nocturne (true dark mode for code-heavy dev-twitter cards). Choose a theme in the toolbar; the PNG matches the preview.',
  },
  {
    question: 'Will my Markdown be uploaded to a server?',
    answer:
      'No. Markdown rendering and PNG rasterization happen entirely in your browser. The source text and the resulting image never leave your device unless you explicitly create a share link.',
  },
  {
    question: 'Can I post the image on Twitter/X, LinkedIn, Slack, or GitHub?',
    answer:
      'Yes — that is the primary use case. PNG is the format social platforms, chat tools, and issue trackers expect. The retina-class output is generally more resilient to social-platform recompression than a low-DPI screenshot, and the fixed preview width avoids the awkward cropping you get from snipping tools.',
  },
  {
    question: 'Does the image keep code syntax highlighting?',
    answer:
      'Yes. Fenced code blocks are highlighted in the live preview and the PNG export captures that highlighted result. Languages, themes, and inline `code` styling all carry through.',
  },
  {
    question: 'Can I export Markdown with LaTeX math or Mermaid diagrams as an image?',
    answer:
      'Yes. KaTeX equations and Mermaid diagrams render in the preview before the PNG is generated, so an academic snippet or an architecture flowchart exports as a single self-contained image — no manual screenshot of the rendered output required.',
  },
];

export const markdownToImageLandingPage: LandingPageConfig = {
  slug: 'markdown-to-image',
  path: '/markdown-to-image',
  prerender: true,
  title: markdownToImageTitle,
  description: markdownToImageDescription,
  heroTitle: 'Markdown to Image Generator',
  initialMarkdown: markdownToImageInitialMarkdown,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToImageTitle,
        description: markdownToImageDescription,
        path: '/markdown-to-image',
      },
      [
        'Markdown to image generator',
        'Markdown to PNG converter',
        'Markdown to JPG alternative (PNG output)',
        'Markdown screenshot generator',
        'Carbon alternative for full Markdown',
        'ray.so alternative with tables and Mermaid',
        'Markdown code snippet to image',
        'README to image',
        'Markdown to Twitter image',
        'Markdown to LinkedIn post image',
        'Markdown to Slack image',
        'Markdown to GitHub issue image',
        'Markdown to image with LaTeX math',
        'Markdown to image with Mermaid diagrams',
        'Retina Markdown PNG export',
        'No-watermark Markdown image',
        'Dark mode Markdown image',
        'Long Markdown auto-sliced PNG',
      ]
    ),
    ...buildFaqSchema(markdownToImageFaqItems),
  ],
  workbenchVariant: {
    exportOptions: ['image'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown to image — frequently asked questions',
      description:
        'The practical concerns people raise before swapping a screenshot workflow for a Markdown to image generator.',
      faqItems: markdownToImageFaqItems,
    },
  ],
};
