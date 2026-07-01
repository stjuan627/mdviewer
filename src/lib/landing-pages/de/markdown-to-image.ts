import { markdownToImageInitialMarkdownDe } from '@/lib/landing-pages/content/de/markdown-to-image';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToImageTitleDe = 'Markdown to Image - Kostenloser Markdown-zu-Bild-Generator';
const markdownToImageDescriptionDe =
  'Kostenloser Markdown-zu-Bild-Generator. Wandle Markdown - Code, Tabellen, Formeln und Mermaid - in ein sauberes gerendertes Bild für Twitter/X, LinkedIn, Slack, GitHub oder Slides um. PNG bleibt nur das Download-Format.';

const markdownToImageFaqItemsDe: LandingSectionFaqItem[] = [
  {
    question: 'Worin unterscheidet sich das von Carbon, ray.so oder polacode?',
    answer:
      'Carbon, ray.so und polacode sind auf einen einzelnen fenced code block ausgelegt. Dieser Markdown-zu-Bild-Generator rendert vollständiges GitHub Flavored Markdown - also Überschriften, Tabellen, Task-Listen, Blockquotes, LaTeX-Mathematik und Mermaid-Diagramme - und exportiert die komplette gerenderte Karte als Bild. Wenn dein Ausschnitt mehr als nur Code enthält, ist das hier die passendere Carbon-Alternative.',
  },
  {
    question: 'Kann ich das gerenderte Bild als JPG oder JPEG herunterladen?',
    answer:
      'Nein, der Download ist bewusst nur als PNG verfügbar. Markdown-Inhalte bestehen meist aus kleinem Text, syntaxhervorgehobenem Code und klaren Tabellenlinien - genau dort würden JPG-Artefakte sichtbar werden. PNG hält Textkanten sauber und wird von Twitter/X, LinkedIn, Slack, Discord, GitHub und Notion problemlos akzeptiert.',
  },
  {
    question: 'Hat das exportierte Bild ein Wasserzeichen oder Branding?',
    answer:
      'Nein. Es gibt kein Wasserzeichen, kein Logo und keine Signatur im Download. Das Bild, das du herunterlädst, ist einfach die gerenderte Markdown-Vorschau - sonst nichts. Du kannst es direkt als eigenes Asset verwenden.',
  },
  {
    question: 'Ist das Bild hochauflösend beziehungsweise retina-tauglich?',
    answer:
      'Ja. Das Bild wird mit 2× Gerätepixeln rasterisiert, also in Retina-Dichte. Dadurch bleibt Text auf HiDPI-Laptops, 4K-Displays, projizierten Slides und auch nach der Komprimierung durch Social-Plattformen scharf.',
  },
  {
    question: 'Was passiert, wenn mein Markdown sehr lang ist?',
    answer:
      'Langer Inhalt wird automatisch in mehrere nummerierte Bilddateien aufgeteilt (`mdviewer-export-1.png`, `mdviewer-export-2.png`, ...), sobald ein einzelnes Canvas das Browser-Limit überschreiten würde. Ein langes README oder Changelog wird also nicht still unten abgeschnitten.',
  },
  {
    question: 'Kann ich für das Bild ein Theme wählen - hell, dunkel oder technisch?',
    answer:
      'Ja. Die Workbench bringt drei Presets mit: Paper (warmes editoriales Hell-Theme), Blueprint (klares technisches Kontrast-Theme) und Nocturne (echter Dunkelmodus für code-lastige Karten). Du wählst das Theme in der Toolbar; das exportierte Bild entspricht anschließend der Vorschau.',
  },
  {
    question: 'Wird mein Markdown auf einen Server hochgeladen?',
    answer:
      'Nein. Das Markdown-Rendering und die Rasterisierung laufen vollständig in deinem Browser. Weder der Quelltext noch das fertige Bild verlassen dein Gerät, es sei denn, du erzeugst bewusst einen Share-Link.',
  },
  {
    question: 'Kann ich das Bild auf Twitter/X, LinkedIn, Slack oder GitHub posten?',
    answer:
      'Ja - genau dafür ist der Workflow gedacht. Ein gerendertes Markdown-Bild passt in Social-Plattformen, Chat-Tools und Issue-Tracker deutlich besser als rohes Markdown oder ein unruhiger Fensterscreenshot.',
  },
  {
    question: 'Bleibt Syntax-Highlighting im Bild erhalten?',
    answer:
      'Ja. Fenced Codeblocks werden bereits in der Live-Vorschau hervorgehoben, und der Export übernimmt genau dieses gerenderte Ergebnis. Sprachen, Themes und auch inline gesetztes `code` bleiben erhalten.',
  },
  {
    question: 'Kann ich Markdown mit LaTeX-Formeln oder Mermaid-Diagrammen als Bild exportieren?',
    answer:
      'Ja. KaTeX-Formeln und Mermaid-Diagramme werden vor dem Export in der Vorschau gerendert. So kannst du einen akademischen Ausschnitt oder einen Architektur-Flow als einzelnes, eigenständiges Bild exportieren - ohne manuelle Screenshots der fertigen Darstellung.',
  },
];

export const markdownToImageLandingPageDe: LandingPageConfig = {
  locale: 'de',
  slug: 'markdown-to-image',
  path: '/markdown-to-image',
  prerender: true,
  title: markdownToImageTitleDe,
  description: markdownToImageDescriptionDe,
  heroTitle: 'Markdown to Image',
  heroDescription:
    'Wandle Markdown, Code, Tabellen, Formeln und Mermaid-Diagramme in ein sauberes gerendertes Bild um. Der Download erfolgt als PNG, aber die Oberfläche bleibt klar auf Bild-Export ausgerichtet.',
  initialMarkdown: markdownToImageInitialMarkdownDe,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToImageTitleDe,
        description: markdownToImageDescriptionDe,
        path: '/markdown-to-image',
      },
      [
        'Markdown to Image',
        'Markdown in Bild umwandeln',
        'Markdown zu Bild',
        'Markdown Screenshot Generator',
        'Markdown-zu-Bild-Generator',
        'Code Snippet als Bild',
        'Carbon Alternative für Markdown',
        'ray.so Alternative mit Tabellen und Mermaid',
        'README als Bild',
        'Markdown für Twitter Bild',
        'Markdown für LinkedIn Post Bild',
        'Markdown für Slack Bild',
        'Markdown für GitHub Issue Bild',
        'Markdown mit LaTeX als Bild',
        'Markdown mit Mermaid als Bild',
        'Retina Markdown Bild Export',
        'Markdown Bild ohne Wasserzeichen',
        'Langes Markdown automatisch in Bilddateien teilen',
      ]
    ),
    ...buildFaqSchema(markdownToImageFaqItemsDe),
  ],
  workbenchVariant: {
    exportOptions: ['image'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown to Image - häufige Fragen',
      description:
        'Die praktischen Fragen, die vor dem Wechsel von manuellen Screenshots zu einem Markdown-zu-Bild-Generator meistens auftauchen.',
      faqItems: markdownToImageFaqItemsDe,
    },
  ],
};
