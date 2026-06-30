import { homeInitialMarkdownFr } from '@/lib/landing-pages/content/fr/home';
import { buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const homeLandingPageFr: LandingPageConfig = {
  locale: 'fr',
  slug: 'home',
  path: '/',
  prerender: true,
  title: 'Éditeur Markdown en ligne avec aperçu en direct | MD Viewer',
  description:
    'Éditeur Markdown en ligne gratuit pour ouvrir un README ou un fichier .md avec aperçu en direct. Prend en charge GFM, LaTeX et Mermaid, avec copie HTML propre, export PDF et lien public.',
  heroTitle: 'Éditeur Markdown en ligne',
  heroDescription:
    'Collez votre Markdown et voyez le rendu immédiatement. GFM, LaTeX, Mermaid et coloration du code sont pris en charge, avec copie HTML propre, export PDF et lien public dans la même interface.',
  initialMarkdown: homeInitialMarkdownFr,
  schema: buildSoftwareSchema(
    {
      title: 'Éditeur Markdown en ligne avec aperçu en direct | MD Viewer',
      description:
        'Éditeur Markdown en ligne gratuit pour ouvrir un README ou un fichier .md avec aperçu en direct. Prend en charge GFM, LaTeX et Mermaid, avec copie HTML propre, export PDF et lien public.',
      path: '/',
    },
    [
      'éditeur markdown en ligne',
      'aperçu markdown',
      'aperçu markdown en direct',
      'ouvrir un fichier md',
      'rendu GFM LaTeX Mermaid',
      'copier un HTML propre',
      'exporter markdown en PDF',
      'partager une page markdown',
    ]
  ),
  workbenchVariant: {
    exportOptions: ['html', 'pdf', 'image'],
  },
  sections: [],
};
