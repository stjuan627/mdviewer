import { markdownToHtmlInitialMarkdownDe } from '@/lib/landing-pages/content/de/markdown-to-html';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToHtmlTitleDe = 'Markdown-zu-HTML-Konverter — Kostenloses Online-Tool für Markdown zu HTML';
const markdownToHtmlDescriptionDe =
  'Kostenloser Online-Konverter für Markdown zu HTML. Füge .md ein oder lade eine Datei hoch, prüfe das gerenderte Ergebnis und kopiere sauberes semantisches HTML direkt in ein CMS, einen E-Mail-Builder oder eine Web-App — ohne Installation und ohne Registrierung.';

const markdownToHtmlFaqItemsDe: LandingSectionFaqItem[] = [
  {
    question: 'Ist dieser Markdown-zu-HTML-Konverter kostenlos?',
    answer:
      'Ja. Der Markdown-zu-HTML-Konverter ist kostenlos nutzbar, ohne Registrierung, ohne Konto und ohne Nutzungslimit für Umwandlungen. Füge Markdown ein, prüfe die gerenderte Vorschau und kopiere anschließend das HTML.',
  },
  {
    question: 'Erzeugt die Ausgabe sauberes, semantisches HTML?',
    answer:
      'Ja. Überschriften werden als `<h1>`–`<h6>`, Listen als `<ul>` / `<ol>`, Tabellen als korrektes `<table>`-Markup und Code als `<pre><code>` gerendert. Das HTML enthält keine frameworkspezifischen Klassen, Hydration-Marker oder Tracking-Attribute und kann daher in ein CMS, eine E-Mail-Vorlage oder eine eigene Web-App eingefügt werden.',
  },
  {
    question: 'Kann ich das umgewandelte HTML in Notion, Webflow, Ghost oder WordPress einfügen?',
    answer:
      'Ja. Das exportierte HTML verwendet Standard-Tags, die Rich-Text-Editoren und CMS-Importer typischerweise verarbeiten können. Notion akzeptiert eingefügtes HTML; Webflow, Ghost und WordPress können es in HTML-Einbettungen oder Code-Blöcken verwenden. Wenn ein Ziel Klassenattribute entfernt, bleibt die zugrunde liegende Tag-Struktur dennoch erhalten.',
  },
  {
    question: 'Ist das HTML für E-Mail-Newsletter geeignet?',
    answer:
      'Der Konverter erzeugt semantisches HTML, das ein guter Ausgangspunkt für Newsletter-Tools wie Mailchimp, Substack, Beehiiv oder Transaktionsmails ist. Die meisten E-Mail-Clients erwarten für vollständige visuelle Genauigkeit weiterhin Inline-Styles, deshalb solltest du für E-Mails im Produktivbetrieb zusätzlich CSS ergänzen oder inline setzen.',
  },
  {
    question: 'Bleibt Syntax-Highlighting für Codeblöcke erhalten?',
    answer:
      'Ja. Fenced Code Blocks mit Sprachhinweis (z. B. ```` ```ts ````) behalten sprachbezogene Klassenhinweise, sodass du Syntax-Highlighting über dein eigenes CSS-Theme stylen kannst, ohne den Code erneut zu parsen.',
  },
  {
    question: 'Kann ich statt Einfügen auch eine `.md`-Datei hochladen?',
    answer:
      'Ja. Die Workbench akzeptiert `.md`, `.markdown` und einfache Textdateien. Ziehe eine Datei hinein, prüfe die gerenderte HTML-Vorschau und kopiere oder lade anschließend das HTML-Ergebnis herunter.',
  },
  {
    question: 'Wird mein Markdown während der Umwandlung auf einen Server hochgeladen?',
    answer:
      'Nein. Die Umwandlung von Markdown zu HTML läuft lokal in deinem Browser-Tab. Deine Inhalte bleiben auf deinem Gerät, außer du erzeugst bewusst einen Share-Link, was optional ist.',
  },
  {
    question: 'Worin unterscheidet sich das von Pandoc oder einem Static-Site-Generator?',
    answer:
      'Pandoc ist ein CLI-Tool für skriptgesteuerte Stapelverarbeitung. Static-Site-Generatoren wie Astro, Hugo oder Eleventy setzen ein vollständiges Projekt mit Konfiguration und Build-Ausgabe voraus. Dieser Markdown-zu-HTML-Konverter ist für den Einzelfall gedacht: Tab öffnen, Markdown einfügen, HTML-Snippet mitnehmen, ohne Installation oder Projekt-Setup.',
  },
  {
    question: 'Kann ich hier auch HTML zurück in Markdown konvertieren?',
    answer:
      'Nein — dieses Tool arbeitet in eine Richtung: Markdown zu HTML. Für die Rückkonvertierung brauchst du ein eigenes HTML-zu-Markdown-Tool oder eine passende Bibliothek; die maßgebliche Quelle in diesem Workflow bleibt Markdown.',
  },
];

export const markdownToHtmlLandingPageDe: LandingPageConfig = {
  locale: 'de',
  slug: 'markdown-to-html',
  path: '/markdown-to-html',
  prerender: true,
  title: markdownToHtmlTitleDe,
  description: markdownToHtmlDescriptionDe,
  heroTitle: 'Markdown-zu-HTML-Konverter',
  initialMarkdown: markdownToHtmlInitialMarkdownDe,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToHtmlTitleDe,
        description: markdownToHtmlDescriptionDe,
        path: '/markdown-to-html',
      },
      [
        'Markdown zu HTML Konverter',
        'MD zu HTML',
        'Markdown zu HTML online',
        'Markdown in HTML umwandeln',
        'Kostenloser Markdown-zu-HTML-Konverter',
        'Online-Tool für Markdown zu HTML',
        '.md in HTML umwandeln',
        'HTML aus Markdown kopieren',
        'Gerendertes Markdown als HTML herunterladen',
        'README zu HTML',
        'GitHub Markdown zu HTML',
        'GFM zu HTML Konverter',
        'Markdown zu semantischem HTML',
        'Saubere Markdown-zu-HTML-Ausgabe',
        'Markdown zu HTML mit Codeblöcken',
        'Markdown zu HTML für Newsletter',
        'Markdown zu HTML für Notion',
        'Markdown zu HTML für Webflow',
        'Markdown zu HTML für Ghost CMS',
        'Markdown zu HTML für WordPress',
        'Live-Vorschau vor dem HTML-Kopieren',
        'Browserbasierter Markdown-zu-HTML-Konverter',
        'Markdown zu HTML ohne Installation',
      ]
    ),
    ...buildFaqSchema(markdownToHtmlFaqItemsDe),
  ],
  workbenchVariant: {
    exportOptions: ['html'],
  },
  sections: [
    {
      id: 'destinations',
      kicker: 'So fügst du es ein',
      title: 'Markdown-zu-HTML-Ausgabe in gängige Ziele einfügen',
      description:
        'Die Markdown-zu-HTML-Ausgabe ist allgemein nutzbar und semantisch, aber jedes Ziel akzeptiert HTML an einer etwas anderen Stelle. Hier ist die Kurzreferenz für die häufigsten Fälle.',
      columns: 3,
      cards: [
        {
          title: 'Notion',
          description: 'Notion wandelt eingefügtes HTML in native Blöcke um.',
          items: [
            'Kopiere das HTML aus der Workbench oben.',
            'Füge es in eine Notion-Seite ein — Überschriften, Listen, Tabellen und Codeblöcke werden zu nativen Notion-Blöcken.',
          ],
        },
        {
          title: 'Webflow',
          description: 'Verwende das **Embed**-Element für rohes HTML.',
          items: [
            'Ziehe ein Embed-Element auf die Seite.',
            'Füge das umgewandelte HTML ein und style es mit deinen vorhandenen Webflow-CSS-Klassen.',
          ],
        },
        {
          title: 'Ghost',
          description: 'Nutze die **HTML-Karte** im Ghost-Editor.',
          items: [
            'Füge eine HTML-Karte ein und kopiere das umgewandelte Markup hinein.',
            'Ghost behält die semantische Struktur im veröffentlichten Beitrag bei.',
          ],
        },
        {
          title: 'WordPress',
          description: 'Verwende den **Custom HTML**-Block (Gutenberg) oder die HTML-Ansicht (Classic).',
          items: [
            'Füge einen Custom-HTML-Block hinzu und setze dort das umgewandelte HTML ein.',
            'Wechsle in die Vorschau, um zu prüfen, ob Tabellen und Codeblöcke korrekt gerendert werden.',
          ],
        },
        {
          title: 'Mailchimp / Substack',
          description: 'Die meisten Newsletter-Tools akzeptieren eingefügtes HTML in einem Code- oder HTML-Block.',
          items: [
            'Füge es in den Code- oder HTML-Block im Kampagnen-Editor ein.',
            'Ergänze bei Bedarf Inline-Styles für konsistente Darstellung in Outlook und Gmail.',
          ],
        },
        {
          title: 'Static Sites und Frameworks',
          description: 'Verwende das HTML innerhalb einer MDX-, Astro- oder Framework-Partial-Datei.',
          items: [
            'Speichere es als `.html`-Datei oder füge es direkt in eine Komponente ein.',
            'Die Klassennamen bleiben vorhersehbar, sodass dein eigenes CSS-Theme die Darstellung übernimmt.',
          ],
        },
      ],
    },
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown-zu-HTML-Konverter — häufige Fragen',
      description:
        'Die praktischen Fragen, die Menschen stellen, bevor sie einem browserbasierten Markdown-zu-HTML-Tool echte Inhalte anvertrauen.',
      faqItems: markdownToHtmlFaqItemsDe,
    },
  ],
};
