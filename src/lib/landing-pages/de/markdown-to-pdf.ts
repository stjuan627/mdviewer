import { markdownToPdfInitialMarkdownDe } from '@/lib/landing-pages/content/de/markdown-to-pdf';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToPdfTitle = 'Markdown-zu-PDF-Konverter - Kostenlos .md online in PDF umwandeln';
const markdownToPdfDescription =
  'Kostenloser Online-Konverter für Markdown zu PDF. .md einfügen oder hochladen, GFM-Tabellen, Code, LaTeX-Formeln und Mermaid prüfen und dann eine saubere PDF exportieren - ohne Installation.';

const markdownToPdfFaqItems: LandingSectionFaqItem[] = [
  {
    question: 'Muss ich etwas installieren, um Markdown in PDF umzuwandeln?',
    answer:
      'Nein. Dieser Konverter für Markdown zu PDF läuft vollständig im Browser - keine Desktop-App, kein CLI-Setup, kein Pandoc und kein wkhtmltopdf. Markdown einfügen, Vorschau prüfen und auf PDF exportieren klicken.',
  },
  {
    question: 'Werden meine Markdown-Dateien auf einen Server hochgeladen?',
    answer:
      'Nein. Markdown-Rendering und PDF-Export laufen lokal in deinem Browser. Deine Inhalte bleiben auf deinem Gerät, es sei denn, du erstellst ausdrücklich einen öffentlichen Freigabelink.',
  },
  {
    question: 'Enthält die exportierte PDF auswählbaren und durchsuchbaren Text?',
    answer:
      'Ja. Die PDF enthält echten, auswählbaren und durchsuchbaren Text - keine reine Bilddatei ohne Textebene. Dadurch können Prüfende Text kopieren, Kommentare setzen und die Datei per Volltextsuche durchsuchen.',
  },
  {
    question: 'Bleibt das Syntax-Highlighting von Code im PDF erhalten?',
    answer:
      'Ja. Fenced Code Blocks behalten ihr sprachabhängiges Syntax-Highlighting in der exportierten PDF. Dasselbe Highlighting, das du in der Live-Vorschau siehst, landet auch in der Datei.',
  },
  {
    question: 'Kann ich Markdown mit LaTeX-Formeln und Mermaid-Diagrammen als PDF exportieren?',
    answer:
      'Ja. Über KaTeX gerenderte LaTeX-Formeln und Mermaid-Diagramme erscheinen in der Vorschau als scharfes SVG und bleiben auch beim Export in PDF erhalten. Das ist besonders praktisch für akademische und technische Dokumente.',
  },
  {
    question: 'Kann ich Seitengröße und Ränder anpassen, etwa A4, Letter oder Legal?',
    answer:
      'Ja. Wenn sich beim PDF-Export der Druckdialog des Browsers öffnet, kannst du Papierformat, Ausrichtung und Ränder vor dem Speichern der PDF festlegen.',
  },
  {
    question: 'Kann ich statt Einfügen auch eine .md-Datei hochladen?',
    answer:
      'Ja. Die Workbench akzeptiert hochgeladene `.md`-, `.markdown`- und Textdateien. Datei ablegen, gerenderte Vorschau prüfen und anschließend die PDF exportieren.',
  },
  {
    question: 'Worin unterscheidet sich das von Pandoc, Typora oder wkhtmltopdf?',
    answer:
      'Pandoc und wkhtmltopdf sind CLI-Tools mit lokaler Installation und Konfiguration. Typora ist eine kostenpflichtige Desktop-App. Dieser Konverter für Markdown zu PDF ist kostenlos, läuft in jedem Browser, unterstützt GFM, LaTeX und Mermaid direkt und erledigt einen einmaligen Export in weniger als einer Minute.',
  },
];

export const markdownToPdfLandingPageDe: LandingPageConfig = {
  locale: 'de',
  slug: 'markdown-to-pdf',
  path: '/markdown-to-pdf',
  prerender: true,
  title: markdownToPdfTitle,
  description: markdownToPdfDescription,
  heroTitle: 'Markdown-zu-PDF-Konverter',
  initialMarkdown: markdownToPdfInitialMarkdownDe,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToPdfTitle,
        description: markdownToPdfDescription,
        path: '/markdown-to-pdf',
      },
      [
        'Markdown zu PDF',
        'Markdown in PDF umwandeln',
        'MD zu PDF',
        'Markdown als PDF exportieren',
        'Markdown-zu-PDF-Konverter',
        '.md in PDF umwandeln',
        'Markdown zu PDF online',
        'Markdown Datei in PDF konvertieren',
        'Markdown PDF Export mit LaTeX-Formeln',
        'Markdown PDF Export mit Mermaid-Diagrammen',
        'Markdown Vorschau vor PDF-Export',
        'Markdown zu PDF ohne Installation',
      ]
    ),
    ...buildFaqSchema(markdownToPdfFaqItems),
  ],
  workbenchVariant: {
    exportOptions: ['pdf'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown-zu-PDF-Konverter - häufige Fragen',
      description:
        'Die praktischen Fragen, die vor der Nutzung eines browserbasierten Konverters für Markdown zu PDF meist gestellt werden.',
      faqItems: markdownToPdfFaqItems,
    },
  ],
};
