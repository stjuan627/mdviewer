export const markdownToImageInitialMarkdownDe = `## Markdown to Image - gerendertes Markdown ohne Screenshots teilen

Dieser browserbasierte **Markdown to Image**-Workflow ist für den Moment gedacht, in dem rohes Markdown zu unruhig zum Teilen ist, ein manueller Screenshot aber zu umständlich wäre. Füge ein README, Release Notes, ein Code-Snippet, ein Architekturdiagramm oder eine Checkliste ein und nimm ein sauberes Bild mit, das du direkt in Twitter/X, LinkedIn, Slack, Discord, ein GitHub-Issue oder eine Folie einfügen kannst.

Wenn du nach *"markdown to image"*, *"markdown in bild umwandeln"*, *"markdown zu bild"*, *"markdown screenshot generator"*, *"code snippet als bild"* oder einer **Carbon-Alternative für komplettes Markdown** suchst, ist diese Seite genau für diesen Markdown to Image-Workflow gebaut. Genau hier beginnt der direkte Markdown to Image-Ablauf im Browser.

## Warum Markdown als Bild statt HTML oder PDF exportieren?

[Markdown zu **HTML**](/markdown-to-html) ist für Publishing gedacht, wenn das Ziel Markup selbst rendert. [Markdown zu **PDF**](/markdown-to-pdf) ist für Dokumente gedacht, die Menschen öffnen, scrollen und archivieren. **Markdown to Image** liegt genau dazwischen - für Chats, Social Feeds, Slides, Status-Updates, Statusseiten und Bugreports, bei denen die andere Person den Inhalt einfach sehen will, ohne selbst etwas rendern zu müssen.

Typische Gründe, warum Menschen Markdown to Image oder einen Markdown-zu-Bild-Generator verwenden:

- Einen sauber formatierten Ausschnitt in **Twitter/X, LinkedIn, Bluesky, Threads oder Mastodon** posten, ohne rohe \`*Sternchen*\` und \`# Hashes\` zu zeigen.
- Eine Code-Review-Zusammenfassung, einen Stack Trace oder ein Error-Log als einzelnes Bild in **Slack, Discord oder Microsoft Teams** teilen.
- Einen gerenderten \`.md\`-Snapshot an ein **GitHub-Issue, ein Linear-Ticket oder eine Notion-Seite** hängen, damit das Layout erhalten bleibt.
- **Manuelle Screenshots** der GitHub-README-Vorschau, der VS Code Preview oder einer Doku-Seite durch einen sauberen, reproduzierbaren Export ersetzen.
- Einen **Codeblock, ein Mermaid-Diagramm oder eine LaTeX-Formel** als eigenständiges visuelles Asset für Slides oder Kursmaterial festhalten.

Hier beginnt für viele auch die Suche: *Carbon* und *ray.so* sind stark für kurze Code-Snippets, aber sie rendern kein vollständiges Markdown - keine Tabellen, keine Task-Listen, keine Mathematik, keine Mermaid-Diagramme, keine Zitate. Für Markdown to Image mit vollständigem Dokumentkontext ist dieser Konverter deshalb deutlich passender.

## Markdown Screenshot-Tool - ohne Screenshots aufzunehmen

Der ganze Sinn von Markdown to Image dabei ist, dass du nicht mehr zu einem Screenshot-Tool greifen musst. Die Ausgabe ist ein echtes rasterisiertes Bild aus der gerenderten Vorschau - nicht aus deinem Monitor:

- Der Export liest die **gerenderte Vorschau direkt**, sodass Überschriften, Tabellen und Code ihr Layout behalten - unabhängig von Browser-Zoom oder Fensterbreite.
- Langer Inhalt wird entweder als **ein einziges hohes Bild exportiert** oder automatisch geteilt, wenn die Seite das Canvas-Limit überschreitet - ohne manuelles Zusammensetzen.
- Das Bild wird in **Retina-Auflösung (2× Gerätepixel)** gerendert, damit Text auf HiDPI-Displays, Projektoren und in Social Feeds scharf bleibt.
- Es gibt **kein Wasserzeichen, kein Branding, keine Signatur** in der Datei. Das Bild, das du herunterlädst, ist exakt das Bild, das du weitergibst.

\`\`\`ts
// Der Bild-Export liest die gerenderte Vorschau, nicht den Bildschirm
export async function shareSnippet(markdown: string) {
  const image = await renderToPng(markdown, { theme: 'paper', scale: 2 });
  return image; // ein sauberes Bild ohne Wasserzeichen
}
\`\`\`

## Eine Carbon-/ray.so-Alternative, die komplettes Markdown spricht

Code-Bild-Tools wie Carbon, ray.so und polacode sind um einen einzelnen fenced code block herum gebaut. In dem Moment, in dem dein Snippet eine Überschrift, eine Liste, eine Tabelle, einen Erklärabsatz oder ein Mermaid-Diagramm neben dem Code hat, stoßen diese Tools an Grenzen.

Dieser Konverter startet mit vollständigem GitHub Flavored Markdown. Genau deshalb eignet sich Markdown to Image auch für komplexere Inhalte. Eine "Code-Karte" kann also enthalten:

- Eine **Überschrift**, die den Ausschnitt einleitet
- Einen **Fließtext-Absatz**, der erklärt, was der Code macht
- Den eigentlichen **fenced code block mit Syntax-Highlighting**
- Eine anschließende **Tabelle, Task-Liste oder Callout-Box**
- Optional ein **Mermaid-Diagramm** oder eine **LaTeX-Formel**

\`\`\`ts
// Tabellen, Code und Fließtext werden zusammen exportiert
function highlight(snippet: string): string {
  return shiki.codeToHtml(snippet, { lang: 'ts' });
}
\`\`\`

| Funktion                                | Carbon / ray.so | Dieses Markdown-zu-Bild-Tool |
| ---                                     | ---             | ---                          |
| Fenced Codeblock rendern                | Ja              | Ja                           |
| Überschriften, Listen, Tabellen, Zitate | Nein            | Ja                           |
| GFM-Task-Listen \`- [ ]\`                 | Nein            | Ja                           |
| LaTeX-Mathematik (KaTeX)                | Nein            | Ja                           |
| Mermaid-Diagramme                       | Nein            | Ja                           |
| Längere Markdown-Notizen                | Nein            | Ja (automatisch geteilt)     |
| Wasserzeichen / gebrandeter Rahmen      | Optional        | Nein                         |

## Drei integrierte Themes für gerenderte Markdown-Bilder

Das Bild übernimmt dasselbe Theme, das du in der Vorschau auswählst. Die visuelle Sprache deiner Markdown-zu-Bild-Ausgabe entspricht also exakt dem, was du vorher auf dem Bildschirm geprüft hast. Drei Presets sind in der Workbench enthalten:

- **Paper** - ein warmes, editoriales Theme für Tutorials, Newsletter, Design-Updates und Produkttexte, wenn sich dein Export eher hochwertig als terminalartig anfühlen soll.
- **Blueprint** - ein klares technisches Theme mit hohem Kontrast, passend für Changelogs, RFCs und Engineering-Ankündigungen.
- **Nocturne** - echter **Dunkelmodus**, optimiert für code-lastige Posts, Entwicklerkarten und Inhalte, die neben einem dunklen IDE-Fenster gut aussehen sollen.

Wähle das Theme vor dem Export; das gerenderte Bild entspricht der Vorschau Pixel für Pixel. Wenn du es herunterladen willst, bekommst du es als PNG-Datei, aber die Seite selbst bleibt klar auf **Markdown to Image** ausgerichtet. Für Markdown to Image ist genau diese direkte Übereinstimmung zwischen Vorschau und Export entscheidend.

## Was bei Markdown als Bild erhalten bleibt

Weil der Export die gerenderte Vorschau direkt rasterisiert - statt in einen separaten "Bildmodus" zu wechseln - landet jedes Markdown-Element, das du auf dem Bildschirm siehst, auch im exportierten Bild:

### GitHub Flavored Markdown

- **Überschriften** mit konsistentem vertikalem Rhythmus
- **Tabellen** mit sauberer Spaltenausrichtung
- **Task-Listen** mit \`- [ ]\` und \`- [x]\` Checkboxen
- **Fenced Codeblocks** mit sprachspezifischem Syntax-Highlighting
- **Blockquotes** und Callouts
- **Fußnoten**, **Autolinks** und **Durchstreichungen**

### LaTeX-Matheformeln

Inline-Mathe wie \`$E = mc^2$\` und abgesetzte Gleichungen werden vor dem Export über KaTeX gerendert. So wird aus einem wissenschaftlichen Ausschnitt ein sauberes gerendertes Bild, ohne dass du Formeln aus einem PDF-Reader screenshotten musst.

$$
\\sigma(x) = \\frac{1}{1 + e^{-x}}
$$

### Mermaid-Diagramme

Flowcharts und Sequenzdiagramme werden in der Vorschau als scharfe SVGs gerendert und beim Export sauber rasterisiert:

\`\`\`mermaid
flowchart LR
  Source[Markdown] --> Preview[Themed preview]
  Preview --> Slice[Auto-slice if tall]
  Slice --> Image[Download image]
  Image --> Share[Twitter / Slack / GitHub]
\`\`\`

## Ausgabedetails: Abmessungen, Aufteilung und Qualität

Ein paar praktische Hinweise zu deinem gerenderten Markdown-Bild und zu Markdown to Image als Export-Workflow:

- **Die Breite** wird durch die Vorschau-Spalte bestimmt, nicht durch deinen Viewport. Dasselbe Markdown erzeugt also eine verlässlichere Breite als ein Fensterscreenshot.
- **Hoher Inhalt wird automatisch geteilt** und als mehrere Bilddateien exportiert, wenn ein einzelnes Canvas das sichere Raster-Limit überschreiten würde. Ein langes README wird also nicht still am unteren Rand abgeschnitten.
- **Die Auflösung** wird mit 2× Gerätepixeln berechnet. Das ist die richtige Dichte für Retina-Displays und Social Feeds, die Uploads noch einmal komprimieren.
- **Das Download-Format** ist bewusst PNG. Genau bei kleinem Text, Syntax-Highlighting und Codeblock-Hintergründen würde JPG sichtbare Kompressionsartefakte erzeugen - also genau dort, wo dein Markdown-Bild scharf bleiben muss.
- **Datenschutz**: Rendering und Rasterisierung passieren in deinem Browser. Weder der Markdown-Quelltext noch das erzeugte Bild verlassen dein Gerät, es sei denn, du erstellst bewusst einen Share-Link.

## Checkliste vor dem Export

- [x] Markdown einfügen oder eine \`.md\`- / \`.markdown\`-Datei hochladen
- [ ] Ein Theme wählen: **Paper** (warm), **Blueprint** (technisch) oder **Nocturne** (dunkel)
- [ ] Die Vorschau auf Abstände rund um Codeblocks, Tabellen und Mermaid prüfen
- [ ] Kontrollieren, ob LaTeX-Formeln und Emojis so gerendert werden, wie du es erwartest
- [ ] Im Workbench-Header auf **Export** klicken und **Image (PNG)** auswählen
- [ ] Bei hoher Vorschau mit mehreren nummerierten Bilddateien rechnen
- [ ] Die Datei in Twitter/X, LinkedIn, Slack, Discord, GitHub oder deine Slides ziehen

Ersetze dieses Beispiel oben durch dein eigenes Markdown, wechsle das Theme und exportiere, sobald die Vorschau genauso aussieht, wie du sie teilen möchtest.
`;
