import { markdownToImageInitialMarkdownFr } from '@/lib/landing-pages/content/fr/markdown-to-image';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToImageTitleFr = "Markdown en image — Générateur PNG gratuit | MD Viewer";
const markdownToImageDescriptionFr =
  "Convertissez du Markdown en image depuis le navigateur. Exportez code, tableaux, formules et diagrammes Mermaid en PNG net, sans filigrane et sans capture manuelle.";

const markdownToImageFaqItemsFr: LandingSectionFaqItem[] = [
  {
    question: 'Quelle est la différence avec Carbon, ray.so ou polacode ?',
    answer:
      "Carbon, ray.so et polacode sont surtout pensés pour un seul bloc de code. Ce convertisseur Markdown en image rend du Markdown complet avec titres, tableaux, listes de tâches, citations, LaTeX et Mermaid avant d'exporter le tout en PNG.",
  },
  {
    question: 'Puis-je exporter en JPG ou JPEG au lieu de PNG ?',
    answer:
      "Non. L'export est volontairement limité au PNG, car le texte fin, les bordures de tableaux et le code avec coloration syntaxique restent beaucoup plus nets qu'en JPG.",
  },
  {
    question: "L'image exportée contient-elle un filigrane ou un logo ?",
    answer:
      "Non. Le PNG téléchargé ne contient ni filigrane, ni logo, ni signature. Vous récupérez uniquement l'aperçu Markdown rendu.",
  },
  {
    question: 'Le PNG est-il en haute résolution ?',
    answer:
      "Oui. L'image est rastérisée en 2x, ce qui donne un rendu net sur écrans Retina, slides, affichages 4K et réseaux sociaux.",
  },
  {
    question: 'Que se passe-t-il si mon Markdown est très long ?',
    answer:
      "Le contenu long est découpé automatiquement en plusieurs PNG numérotés quand une seule image dépasserait la limite de rastérisation du navigateur. Vous ne perdez pas la fin d'un README ou d'un changelog.",
  },
  {
    question: "Puis-je choisir un thème visuel pour l'image ?",
    answer:
      "Oui. Trois préréglages sont disponibles dans l'atelier : Paper, Blueprint et Nocturne. Le PNG exporté reprend exactement le thème affiché dans l'aperçu.",
  },
  {
    question: 'Mon Markdown est-il envoyé sur un serveur ?',
    answer:
      "Non. Le rendu Markdown et la génération du PNG se font entièrement dans votre navigateur. Le contenu ne quitte pas votre appareil sauf si vous créez volontairement un lien de partage.",
  },
  {
    question: 'Puis-je publier l’image sur X, LinkedIn, Slack ou GitHub ?',
    answer:
      "Oui. C'est l'un des usages principaux : partager un rendu Markdown propre sur les réseaux, le chat ou un ticket sans dépendre du support natif de la plateforme.",
  },
  {
    question: 'La coloration syntaxique du code est-elle conservée ?',
    answer:
      "Oui. Les blocs de code sont affichés avec coloration syntaxique dans l'aperçu, et l'export PNG capture exactement ce rendu.",
  },
  {
    question: 'Puis-je exporter du LaTeX ou des diagrammes Mermaid en image ?',
    answer:
      "Oui. Les équations KaTeX et les diagrammes Mermaid sont rendus avant la génération de l'image, donc ils sont intégrés directement dans le PNG final.",
  },
];

export const markdownToImageLandingPageFr: LandingPageConfig = {
  locale: 'fr',
  slug: 'markdown-to-image',
  path: '/markdown-to-image',
  prerender: true,
  title: markdownToImageTitleFr,
  description: markdownToImageDescriptionFr,
  heroTitle: 'Convertir Markdown en image',
  initialMarkdown: markdownToImageInitialMarkdownFr,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToImageTitleFr,
        description: markdownToImageDescriptionFr,
        path: '/markdown-to-image',
      },
      [
        'markdown en image',
        'convertir markdown en image',
        'markdown vers image',
        'markdown en png',
        'markdown vers png',
        'capture markdown',
        'convertisseur markdown png',
        'alternative à carbon pour markdown',
        'markdown avec mermaid en image',
        'markdown avec latex en png',
      ]
    ),
    ...buildFaqSchema(markdownToImageFaqItemsFr),
  ],
  workbenchVariant: {
    exportOptions: ['image'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown en image : questions fréquentes',
      description:
        "Les questions pratiques qui reviennent avant de remplacer une capture d'écran manuelle par un générateur Markdown en image.",
      faqItems: markdownToImageFaqItemsFr,
    },
  ],
};
