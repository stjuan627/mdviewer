import { homeInitialMarkdown } from '@/lib/landing-pages/content/home';
import { buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const homeLandingPage: LandingPageConfig = {
  slug: 'home',
  path: '/',
  prerender: false,
  title: 'Online Markdown Viewer with Live Preview - MD Viewer',
  description:
    'Free online markdown viewer with live preview. Paste any README, RFC, or .md file to render GFM, LaTeX math, and Mermaid diagrams instantly. Copy clean HTML or share a public link.',
  heroTitle: 'Online Markdown Viewer',
  heroDescription: 'Paste any markdown and see it rendered instantly — GFM, LaTeX, Mermaid, and code highlighting. Copy clean HTML, export PDF, or share a public link.',
  initialMarkdown: homeInitialMarkdown,
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
    exportOptions: ['html', 'pdf', 'image'],
  },
  sections: [],
};
