import { homeInitialMarkdownDe } from '@/lib/landing-pages/content/de/home';
import { buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const homeLandingPageDe: LandingPageConfig = {
  locale: 'de',
  slug: 'home',
  path: '/',
  prerender: false,
  title: 'Online Markdown Viewer mit Live-Vorschau - MD Viewer',
  description:
    'Kostenloser Online Markdown Viewer mit Live-Vorschau. Füge ein README, RFC oder eine .md-Datei ein und render GFM, LaTeX-Mathematik und Mermaid-Diagramme sofort. Kopiere sauberes HTML, exportiere PDF oder teile einen öffentlichen Link.',
  heroTitle: 'Online Markdown Viewer',
  heroDescription:
    'Füge beliebiges Markdown ein und sieh sofort das gerenderte Ergebnis — GFM, LaTeX, Mermaid und Syntax-Highlighting. Kopiere sauberes HTML, exportiere PDF oder teile einen öffentlichen Link.',
  initialMarkdown: homeInitialMarkdownDe,
  schema: buildSoftwareSchema(
    {
      title: 'Online Markdown Viewer mit Live-Vorschau - MD Viewer',
      description:
        'Kostenloser Online Markdown Viewer mit Live-Vorschau. Füge ein README, RFC oder eine .md-Datei ein und render GFM, LaTeX-Mathematik und Mermaid-Diagramme sofort. Kopiere sauberes HTML, exportiere PDF oder teile einen öffentlichen Link.',
      path: '/',
    },
    [
      'Online Markdown Viewer',
      'Markdown Live-Vorschau',
      'GFM-, LaTeX- und Mermaid-Rendering',
      'PDF-Export',
      'Saubere HTML-Ausgabe kopieren',
      'Gerenderte Markdown-Seiten teilen',
    ]
  ),
  workbenchVariant: {
    exportOptions: ['html', 'pdf', 'image'],
  },
  sections: [],
};
