import { markdownViewerInitialMarkdown } from '@/lib/landing-pages/content/markdown-viewer';
import { buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const markdownViewerLandingPage: LandingPageConfig = {
  slug: 'markdown-viewer',
  path: '/markdown-viewer',
  prerender: true,
  title: 'Markdown Viewer - MD Viewer',
  description: 'Preview Markdown, then open the full workbench with the same draft.',
  heroTitle: 'Preview Markdown, then move into the full workbench.',
  heroDescription:
    'This entry page stays focused on fast markdown viewing. When you need HTML export, PDF export, or a shareable page, continue into the full workbench with the same draft.',
  initialMarkdown: markdownViewerInitialMarkdown,
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
};
