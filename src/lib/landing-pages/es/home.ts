import { homeInitialMarkdownEs } from '@/lib/landing-pages/content/es/home';
import { buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const homeLandingPageEs: LandingPageConfig = {
  locale: 'es',
  slug: 'home',
  path: '/',
  prerender: true,
  title: 'Visor Markdown online con vista previa en tiempo real | MD Viewer',
  description:
    'Visor Markdown online gratis para abrir README y archivos .md con vista previa en tiempo real. Renderiza GFM, LaTeX y Mermaid; permite copiar HTML limpio, exportar PDF y compartir enlaces.',
  heroTitle: 'Visor Markdown online',
  heroDescription:
    'Pega Markdown y míralo al instante. Compatible con GFM, LaTeX, Mermaid y resaltado de código. Copia HTML limpio, exporta PDF o comparte un enlace público.',
  initialMarkdown: homeInitialMarkdownEs,
  schema: buildSoftwareSchema(
    {
      title: 'Visor Markdown online con vista previa en tiempo real | MD Viewer',
      description:
        'Visor Markdown online gratis para abrir README y archivos .md con vista previa en tiempo real. Renderiza GFM, LaTeX y Mermaid; permite copiar HTML limpio, exportar PDF y compartir enlaces.',
      path: '/',
    },
    [
      'visor markdown online',
      'markdown online',
      'vista previa markdown',
      'visor md',
      'GFM, LaTeX y Mermaid',
      'copiar HTML limpio',
      'exportar Markdown a PDF',
      'compartir Markdown por enlace',
    ]
  ),
  workbenchVariant: {
    exportOptions: ['html', 'pdf', 'image'],
  },
  sections: [],
};
