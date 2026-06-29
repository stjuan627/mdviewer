import { markdownToPdfInitialMarkdownEs } from '@/lib/landing-pages/content/es/markdown-to-pdf';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToPdfTitleEs = 'Convertidor Markdown a PDF online gratis | MD Viewer';
const markdownToPdfDescriptionEs =
  'Convierte Markdown a PDF desde el navegador. Pega o sube archivos .md, revisa tablas GFM, código, LaTeX y Mermaid y exporta un PDF limpio sin instalar nada.';

const markdownToPdfFaqItemsEs: LandingSectionFaqItem[] = [
  {
    question: '¿Necesito instalar algo para convertir Markdown a PDF?',
    answer:
      'No. Este convertidor Markdown a PDF funciona dentro del navegador y no necesita app de escritorio, CLI ni configuración de Pandoc o wkhtmltopdf.',
  },
  {
    question: '¿Mis archivos Markdown se suben a un servidor?',
    answer:
      'No. El render y la exportación PDF ocurren localmente en tu navegador, salvo que tú decidas compartir el contenido mediante un enlace público.',
  },
  {
    question: '¿El PDF exportado tiene texto seleccionable y buscable?',
    answer:
      'Sí. El PDF contiene texto real, no una imagen plana, así que se puede seleccionar, copiar y buscar dentro del archivo.',
  },
  {
    question: '¿El PDF conserva el resaltado de sintaxis?',
    answer:
      'Sí. Los bloques de código con lenguaje mantienen su resaltado en la vista previa y ese mismo aspecto pasa al PDF exportado.',
  },
  {
    question: '¿Puedo exportar Markdown con LaTeX y Mermaid?',
    answer:
      'Sí. Las ecuaciones KaTeX y los diagramas Mermaid se renderizan antes de la exportación y se integran en el PDF final.',
  },
  {
    question: '¿Puedo elegir tamaño de papel y márgenes?',
    answer:
      'Sí. Al abrirse el cuadro de impresión del navegador puedes escoger A4, Letter, Legal, orientación y márgenes antes de guardar el PDF.',
  },
  {
    question: '¿Puedo subir un archivo `.md` en lugar de pegar texto?',
    answer:
      'Sí. El workbench acepta archivos `.md`, `.markdown` y texto plano para convertir Markdown a PDF desde archivos locales.',
  },
  {
    question: '¿En qué se diferencia de Pandoc, Typora o wkhtmltopdf?',
    answer:
      'Pandoc y wkhtmltopdf exigen instalación y configuración local; Typora es una app de escritorio de pago. Este convertidor Markdown a PDF es gratis, funciona en el navegador y resuelve exportaciones puntuales con menos fricción.',
  },
];

export const markdownToPdfLandingPageEs: LandingPageConfig = {
  locale: 'es',
  slug: 'markdown-to-pdf',
  path: '/markdown-to-pdf',
  prerender: true,
  title: markdownToPdfTitleEs,
  description: markdownToPdfDescriptionEs,
  heroTitle: 'Convertidor Markdown a PDF',
  heroDescription:
    'Pega Markdown o sube un archivo .md, revisa la vista previa y exporta un PDF limpio con tablas GFM, código, LaTeX y Mermaid, todo desde el navegador.',
  initialMarkdown: markdownToPdfInitialMarkdownEs,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToPdfTitleEs,
        description: markdownToPdfDescriptionEs,
        path: '/markdown-to-pdf',
      },
      [
        'convertidor markdown a pdf',
        'markdown a pdf',
        'convertir markdown a pdf',
        'md a pdf online',
        'exportar markdown a pdf',
        'markdown con latex a pdf',
        'markdown con mermaid a pdf',
        'pdf desde markdown sin instalar',
      ]
    ),
    ...buildFaqSchema(markdownToPdfFaqItemsEs),
  ],
  workbenchVariant: {
    exportOptions: ['pdf'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Preguntas frecuentes sobre Markdown a PDF',
      description:
        'Las dudas más habituales antes de usar un convertidor Markdown a PDF basado en navegador.',
      faqItems: markdownToPdfFaqItemsEs,
    },
  ],
};
