import { markdownToPdfInitialMarkdownFr } from '@/lib/landing-pages/content/fr/markdown-to-pdf';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToPdfTitleFr = 'Convertisseur Markdown en PDF gratuit en ligne | MD Viewer';
const markdownToPdfDescriptionFr =
  'Convertissez Markdown en PDF depuis votre navigateur. Collez ou importez un fichier .md, vérifiez tableaux GFM, code, LaTeX et Mermaid, puis exportez un PDF propre sans installation.';

const markdownToPdfFaqItemsFr: LandingSectionFaqItem[] = [
  {
    question: 'Faut-il installer un logiciel pour convertir Markdown en PDF ?',
    answer:
      'Non. Ce convertisseur Markdown en PDF fonctionne entièrement dans le navigateur, sans application de bureau, sans outil en ligne de commande et sans configuration Pandoc ou wkhtmltopdf.',
  },
  {
    question: 'Mes fichiers Markdown sont-ils envoyés sur un serveur ?',
    answer:
      "Non. Le rendu Markdown et l'export PDF se font localement dans votre navigateur, sauf si vous choisissez vous-même de créer un lien de partage public.",
  },
  {
    question: 'Le PDF exporté contient-il du texte sélectionnable et recherchable ?',
    answer:
      'Oui. Le PDF contient du vrai texte, pas une simple image, donc vous pouvez sélectionner, copier, annoter et rechercher le contenu dans le document.',
  },
  {
    question: 'Le PDF conserve-t-il la coloration syntaxique du code ?',
    answer:
      'Oui. Les blocs de code conservent la coloration syntaxique visible dans la prévisualisation, et ce rendu est repris dans le PDF exporté.',
  },
  {
    question: 'Puis-je exporter du Markdown avec des formules LaTeX et des diagrammes Mermaid ?',
    answer:
      'Oui. Les équations rendues avec KaTeX et les diagrammes Mermaid apparaissent dans la prévisualisation puis dans le PDF final.',
  },
  {
    question: 'Puis-je choisir le format de page et les marges, par exemple A4, Letter ou Legal ?',
    answer:
      "Oui. Quand la fenêtre d'impression du navigateur s'ouvre pendant l'export PDF, vous pouvez choisir le format de papier, l'orientation et les marges avant d'enregistrer le fichier.",
  },
  {
    question: 'Puis-je importer un fichier `.md` au lieu de coller du texte ?',
    answer:
      'Oui. Le workbench accepte les fichiers `.md`, `.markdown` et texte brut pour convertir un document Markdown en PDF depuis un fichier local.',
  },
  {
    question: 'En quoi cet outil diffère-t-il de Pandoc, Typora ou wkhtmltopdf ?',
    answer:
      "Pandoc et wkhtmltopdf demandent une installation locale et plus de configuration. Typora est une application de bureau payante. Ici, vous convertissez Markdown en PDF gratuitement depuis le navigateur, avec GFM, LaTeX et Mermaid sans réglage supplémentaire.",
  },
];

export const markdownToPdfLandingPageFr: LandingPageConfig = {
  locale: 'fr',
  slug: 'markdown-to-pdf',
  path: '/markdown-to-pdf',
  prerender: true,
  title: markdownToPdfTitleFr,
  description: markdownToPdfDescriptionFr,
  heroTitle: 'Convertisseur Markdown en PDF',
  heroDescription:
    'Collez du Markdown ou importez un fichier .md, vérifiez la prévisualisation en direct, puis exportez un PDF propre avec tableaux GFM, code, LaTeX et Mermaid, sans rien installer.',
  initialMarkdown: markdownToPdfInitialMarkdownFr,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToPdfTitleFr,
        description: markdownToPdfDescriptionFr,
        path: '/markdown-to-pdf',
      },
      [
        'convertir markdown en pdf',
        'markdown en pdf',
        'convertisseur markdown en pdf',
        'md en pdf',
        'exporter markdown en pdf',
        'markdown avec latex en pdf',
        'markdown avec mermaid en pdf',
        'pdf depuis markdown sans installation',
      ]
    ),
    ...buildFaqSchema(markdownToPdfFaqItemsFr),
  ],
  workbenchVariant: {
    exportOptions: ['pdf'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Questions fréquentes sur Markdown en PDF',
      description:
        "Les questions les plus courantes avant d'utiliser un convertisseur Markdown en PDF dans le navigateur.",
      faqItems: markdownToPdfFaqItemsFr,
    },
  ],
};
