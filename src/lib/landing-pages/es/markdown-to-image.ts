import { markdownToImageInitialMarkdownEs } from '@/lib/landing-pages/content/es/markdown-to-image';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToImageTitleEs = 'Markdown a imagen - Generador PNG online gratis | MD Viewer';
const markdownToImageDescriptionEs =
  'Convierte Markdown en imagen PNG desde el navegador. Exporta código, tablas, fórmulas y Mermaid con buena nitidez, sin marca de agua y sin hacer capturas manuales.';

const markdownToImageFaqItemsEs: LandingSectionFaqItem[] = [
  {
    question: '¿En qué se diferencia de Carbon, ray.so o polacode?',
    answer:
      'Carbon, ray.so y polacode se enfocan en una sola porción de código. Esta herramienta de Markdown a imagen renderiza Markdown completo con encabezados, tablas, listas, LaTeX y Mermaid antes de exportar PNG.',
  },
  {
    question: '¿Puedo exportar JPG o JPEG en vez de PNG?',
    answer:
      'No. La exportación es solo PNG porque el texto pequeño, los bordes de tabla y el código resaltado se ven mucho mejor en PNG que en JPG.',
  },
  {
    question: '¿La imagen exportada lleva marca de agua?',
    answer:
      'No. El PNG descargado no lleva logotipo ni firma incrustada. Obtienes la vista previa renderizada, nada más.',
  },
  {
    question: '¿La imagen sale en buena resolución?',
    answer:
      'Sí. El PNG se genera a densidad 2x para mantener texto nítido en pantallas retina, slides y plataformas sociales.',
  },
  {
    question: '¿Qué pasa si mi Markdown es muy largo?',
    answer:
      'El contenido largo se divide automáticamente en varias PNG numeradas cuando una sola imagen superaría el límite seguro del lienzo del navegador.',
  },
  {
    question: '¿Puedo elegir tema visual para la imagen?',
    answer:
      'Sí. Puedes elegir Paper, Blueprint o Nocturne en la barra superior y el PNG saldrá con el mismo aspecto que la vista previa.',
  },
  {
    question: '¿Mi Markdown se sube a un servidor?',
    answer:
      'No. El render y la rasterización del PNG ocurren en el navegador. El contenido no sale de tu dispositivo salvo que tú generes un enlace de compartir.',
  },
  {
    question: '¿Puedo publicar la imagen en X, LinkedIn, Slack o GitHub?',
    answer:
      'Sí. Ese es uno de los casos de uso principales: compartir Markdown renderizado como PNG sin depender de cómo cada plataforma trate el texto enriquecido.',
  },
  {
    question: '¿Conserva el resaltado de sintaxis del código?',
    answer:
      'Sí. Los bloques de código se renderizan con resaltado en la vista previa y la exportación PNG captura ese mismo resultado.',
  },
  {
    question: '¿Puedo exportar LaTeX o Mermaid como imagen?',
    answer:
      'Sí. Las fórmulas KaTeX y los diagramas Mermaid se renderizan antes de generar la imagen, así que quedan integrados en el PNG final.',
  },
];

export const markdownToImageLandingPageEs: LandingPageConfig = {
  locale: 'es',
  slug: 'markdown-to-image',
  path: '/markdown-to-image',
  prerender: true,
  title: markdownToImageTitleEs,
  description: markdownToImageDescriptionEs,
  heroTitle: 'Markdown a imagen',
  heroDescription:
    'Convierte Markdown en PNG limpio desde el navegador. Exporta código, tablas, fórmulas y Mermaid sin marcas de agua y sin depender de capturas manuales.',
  initialMarkdown: markdownToImageInitialMarkdownEs,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToImageTitleEs,
        description: markdownToImageDescriptionEs,
        path: '/markdown-to-image',
      },
      [
        'markdown a imagen',
        'markdown a png',
        'convertir markdown a imagen',
        'captura markdown',
        'png desde markdown',
        'alternativa a carbon para markdown',
        'markdown con mermaid a imagen',
        'markdown con latex a png',
      ]
    ),
    ...buildFaqSchema(markdownToImageFaqItemsEs),
  ],
  workbenchVariant: {
    exportOptions: ['image'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Preguntas frecuentes sobre Markdown a imagen',
      description:
        'Las preguntas prácticas más comunes antes de sustituir una captura manual por un generador Markdown a imagen.',
      faqItems: markdownToImageFaqItemsEs,
    },
  ],
};
