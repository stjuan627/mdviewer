import { markdownToHtmlInitialMarkdownEs } from '@/lib/landing-pages/content/es/markdown-to-html';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToHtmlTitleEs = 'Convertidor Markdown a HTML online gratis | MD Viewer';
const markdownToHtmlDescriptionEs =
  'Convertidor Markdown a HTML gratis para pasar .md a HTML limpio desde el navegador. Pega o sube Markdown, revisa la vista previa y copia HTML semántico para CMS, email o apps web.';

const markdownToHtmlFaqItemsEs: LandingSectionFaqItem[] = [
  {
    question: '¿Este convertidor Markdown a HTML es gratis?',
    answer:
      'Sí. Puedes usar el convertidor Markdown a HTML gratis, sin registro, sin cuenta y sin límite práctico de conversiones para este flujo en el navegador.',
  },
  {
    question: '¿El resultado genera HTML limpio y semántico?',
    answer:
      'Sí. Los encabezados salen como `<h1>`–`<h6>`, las listas como `<ul>` y `<ol>`, las tablas como `<table>` y el código como `<pre><code>`. No añade clases acopladas a un framework ni marcadores de hidratación.',
  },
  {
    question: '¿Puedo pegar el HTML convertido en Notion, Webflow, Ghost o WordPress?',
    answer:
      'Sí. El HTML exportado usa etiquetas estándar y funciona bien en bloques HTML o embeds de Webflow, Ghost y WordPress. Notion también acepta el pegado en muchos casos.',
  },
  {
    question: '¿Sirve para newsletters o emails?',
    answer:
      'Sí, como base limpia. Si el destino es un email de producción, conviene añadir CSS inline encima del HTML exportado para mejorar compatibilidad entre clientes de correo.',
  },
  {
    question: '¿Conserva el resaltado de sintaxis?',
    answer:
      'Sí. Los bloques de código con indicación de lenguaje mantienen las clases necesarias para que luego puedas aplicar tu propio tema de resaltado.',
  },
  {
    question: '¿Puedo subir un archivo `.md` en vez de pegar texto?',
    answer:
      'Sí. El workbench acepta `.md`, `.markdown` y archivos de texto plano para que conviertas Markdown a HTML desde fichero local.',
  },
  {
    question: '¿Mi Markdown se sube a un servidor durante la conversión?',
    answer:
      'No. La conversión Markdown a HTML ocurre localmente en tu navegador, salvo que tú decidas crear un enlace público de compartir.',
  },
  {
    question: '¿En qué se diferencia de Pandoc o de un generador estático?',
    answer:
      'Pandoc está pensado para flujos por CLI y lotes; Astro, Hugo o Eleventy suponen un proyecto completo. Este convertidor Markdown a HTML sirve para la tarea puntual: abrir una pestaña, pegar Markdown y salir con HTML listo.',
  },
  {
    question: '¿Puedo convertir HTML a Markdown aquí?',
    answer:
      'No. Este flujo es de una sola dirección: de Markdown a HTML. Para el camino inverso necesitas una herramienta específica de HTML a Markdown.',
  },
];

export const markdownToHtmlLandingPageEs: LandingPageConfig = {
  locale: 'es',
  slug: 'markdown-to-html',
  path: '/markdown-to-html',
  prerender: true,
  title: markdownToHtmlTitleEs,
  description: markdownToHtmlDescriptionEs,
  heroTitle: 'Convertidor Markdown a HTML',
  heroDescription:
    'Convierte Markdown en HTML limpio desde el navegador. Pega o sube tu archivo .md, revisa la vista previa y copia HTML semántico para CMS, newsletters o aplicaciones web.',
  initialMarkdown: markdownToHtmlInitialMarkdownEs,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToHtmlTitleEs,
        description: markdownToHtmlDescriptionEs,
        path: '/markdown-to-html',
      },
      [
        'convertidor markdown a html',
        'markdown a html',
        'convertir markdown a html online',
        'md a html',
        'html semántico desde markdown',
        'readme a html',
        'markdown a html para wordpress',
        'markdown a html para notion',
      ]
    ),
    ...buildFaqSchema(markdownToHtmlFaqItemsEs),
  ],
  workbenchVariant: {
    exportOptions: ['html'],
  },
  sections: [
    {
      id: 'destinations',
      kicker: 'Dónde pegarlo',
      title: 'Cómo usar el HTML convertido en destinos habituales',
      description:
        'El HTML convertido desde Markdown es genérico y semántico, pero cada destino acepta ese contenido en un lugar distinto. Aquí tienes una referencia rápida.',
      columns: 3,
      cards: [
        {
          title: 'Notion',
          description: 'Notion suele convertir el HTML pegado en bloques nativos.',
          items: [
            'Copia el HTML desde el workbench.',
            'Pégalo en una página de Notion para transformar encabezados, listas, tablas y código en bloques nativos.',
          ],
        },
        {
          title: 'Webflow',
          description: 'Usa un bloque **Embed** para el HTML sin procesar.',
          items: [
            'Añade un elemento Embed a la página.',
            'Pega el HTML convertido y dale estilo con tu CSS de Webflow.',
          ],
        },
        {
          title: 'Ghost',
          description: 'Ghost acepta HTML mediante la **HTML card**.',
          items: [
            'Inserta una tarjeta HTML y pega el marcado convertido.',
            'La estructura semántica se mantiene en la publicación final.',
          ],
        },
        {
          title: 'WordPress',
          description: 'Usa el bloque **HTML personalizado** en Gutenberg.',
          items: [
            'Crea un bloque HTML personalizado y pega el contenido exportado.',
            'Cambia a la vista previa para revisar tablas y bloques de código.',
          ],
        },
        {
          title: 'Mailchimp / Substack',
          description: 'Suelen aceptar HTML en bloques de código.',
          items: [
            'Pega el HTML en un bloque HTML o Code del editor.',
            'Añade estilos inline si necesitas más consistencia en clientes de correo.',
          ],
        },
        {
          title: 'Sitios estáticos y frameworks',
          description: 'Puedes insertar el HTML dentro de Astro, MDX u otros parciales.',
          items: [
            'Guárdalo como `.html` o insértalo dentro de un componente.',
            'La estructura generada es predecible para que tu propio CSS tome el control.',
          ],
        },
      ],
    },
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Preguntas frecuentes sobre Markdown a HTML',
      description:
        'Las dudas prácticas más comunes antes de usar un convertidor Markdown a HTML basado en navegador con contenido real.',
      faqItems: markdownToHtmlFaqItemsEs,
    },
  ],
};
