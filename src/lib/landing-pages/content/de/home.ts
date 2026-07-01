export const homeInitialMarkdownDe = `## Online Markdown Viewer mit Live-Vorschau

MD Viewer ist ein kostenloser Online Markdown Viewer, der jedes Markdown in sauberes, gut lesbares HTML in Echtzeit rendert. Füge ein README, ein RFC, ein Changelog oder eine beliebige \`.md\`-Datei ein und sieh dir die gerenderte Ausgabe sofort an — mit GFM-Tabellen, LaTeX-Mathematik, Mermaid-Diagrammen und syntaxhervorgehobenem Code, alles so gerendert, wie GitHub oder deine bevorzugte Doku-Seite es rendern würde.

Möchtest du den Quelltext anpassen? Dieselbe Oberfläche funktioniert auch als schlanker Editor — tippe links, beobachte rechts die Markdown-Vorschau und kopiere dann bereinigtes HTML oder teile mit einem Klick einen öffentlichen Link. Kein Konto, keine Installation, kein Aufwand.

## Ein Markdown Viewer, der das Rendering wirklich richtig macht

Die meisten Tools, mit denen du Markdown online ansehen kannst, sparen an den schwierigen Stellen — sie lassen Fußnoten weg, zerlegen Tabellen, zeigen LaTeX als Klartext oder fassen Mermaid gar nicht erst an. MD Viewer schickt dein Markdown durch dieselbe Render-Pipeline, egal ob du lokal vorschaust, HTML kopierst oder einen öffentlichen Link teilst. Was du in der Markdown-Vorschau siehst, ist exakt das, was deine Leser sehen.

Die Live-Vorschau rendert, sobald du einfügst oder tippst, gerade so weit gedrosselt, dass sie auch bei langen Dokumenten flüssig bleibt — füge ein README mit mehreren tausend Wörtern, Diagrammen und Formeln ein, und der Markdown Viewer bleibt reaktionsschnell.

## Volle Rendering-Unterstützung

### GitHub Flavored Markdown (GFM)

Vollständiges CommonMark plus alle GFM-Erweiterungen, die echte Dokumente tatsächlich brauchen:

- **Tabellen** mit Spaltenausrichtung
- **Aufgabenlisten** mit \`- [ ]\`- und \`- [x]\`-Checkboxen
- **Fenced Code Blocks** mit sprachabhängigem Syntax-Highlighting
- **Autolinks** für rohe URLs
- **Fußnoten** für längere Verweise
- **Durchgestrichen** mit \`~~Text~~\`

| Funktion         | Unterstützt | Hinweise                       |
| ---------------- | :---------: | ------------------------------ |
| Tabellen         | ja          | GFM-Syntax für Ausrichtung     |
| Aufgabenlisten   | ja          | Interaktive Checkboxen in HTML |
| Fußnoten         | ja          | Automatisch nummeriert         |
| Durchgestrichen  | ja          | \`~~so wie hier~~\`              |

Füge ein GitHub-README ein, und der Markdown Viewer rendert es so, wie GitHub es rendert — keine fehlenden Checkboxen, keine kaputten Tabellen, keine toten Fußnoten.

### LaTeX-Mathematik

Inline-Mathematik wie \`$E = mc^2$\` und abgesetzte Gleichungen mit \`$$ ... $$\` werden über KaTeX gerendert. Formeln, Matrizen, Summen und griechische Symbole erscheinen in der Markdown-Vorschau korrekt, ohne separaten Viewer oder Screenshots von Gleichungen:

$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$

Perfekt für die Vorschau von wissenschaftlichen Arbeiten, Machine-Learning-READMEs, technischen Notizen und jedem Markdown-zu-HTML-Workflow, der echte Mathematik braucht.

### Mermaid-Diagramme

Flussdiagramme, Sequenzdiagramme, Klassendiagramme, Gantt-Diagramme und Zustandsdiagramme rendern inline als SVG. Füge einen Mermaid-Block aus einer fremden Doku ein, und das Diagramm erscheint sofort — kein Umweg über diagrams.net, keine exportierten PNGs, die du irgendwo zusammensuchen musst:

\`\`\`mermaid
flowchart LR
  Paste[Markdown einfügen] --> Render[Live-Vorschau]
  Render --> Copy[Sauberes HTML kopieren]
  Render --> Share[Öffentlichen Link teilen]
\`\`\`

Diagramme sind in deinem Freigabelink enthalten und bleiben in jeder Größe scharf.

### Bilder und Rich Media

Markdown-Bilder werden inline in ihrer nativen Auflösung gerendert:

![Alt-Text zur Beschreibung des Bildes](https://picsum.photos/600/400)

Der Markdown Viewer lässt deine Bild-URLs im kopierten HTML unverändert, und die Freigabeseite liefert sie responsiv an mobile Leser aus. Zusammen mit Code, Tabellen, Mathematik und Diagrammen kannst du einen vollständigen technischen Artikel rendern und teilen, ohne diesen Online Markdown Viewer zu verlassen.

### Tastaturkürzel

Wenn du das, was du ansiehst, doch bearbeiten willst, hält dich die Editor-Oberfläche auf der Tastatur:

| Kürzel               | Aktion                                  |
| -------------------- | --------------------------------------- |
| **Cmd / Ctrl + B**   | Auswahl fett                            |
| **Cmd / Ctrl + I**   | Auswahl kursiv                          |
| **Cmd / Ctrl + K**   | Link einfügen                           |
| **Cmd / Ctrl + E**   | Inline-Code                             |
| **Cmd / Ctrl + S**   | Entwurf übernehmen / Snapshot speichern |
| **Cmd / Ctrl + /**   | Vorschaufenster umschalten              |
| **Tab / Shift+Tab**  | Listenelemente einrücken / ausrücken    |

### Mehrere Rendering-Themes

Wechsle zwischen kuratierten Themes, die Farbpalette, Typografie und Abstände zu einem stimmigen Gesamtbild verbinden — so kann dasselbe Markdown wie eine technische Doku, ein literarischer Essay, ein wissenschaftliches Paper oder eine moderne Landingpage aussehen, ohne dass du eine Zeile CSS anfassen musst. Jedes Theme passt an:

- **Farbschema** — Hintergrund, Fließtext, Überschriften, Links, Code-Blöcke und Zitat-Akzente
- **Schriftfamilie** — Serif für lange Texte, Sans Serif für Produkttexte, monospace-lastig für technische Notizen und CJK-freundliche Stacks
- **Schriftgröße und Zeilenhöhe** — kompakte, angenehme oder luftige Leserhythmen
- **Skalierung und Gewichtung der Überschriften** — von zurückhaltend redaktionell bis zur kräftigen Marketing-Hierarchie

Die Theme-Auswahl bleibt über Sitzungen hinweg erhalten und wird in die öffentliche Freigabeseite übernommen, sodass Leser genau den Rendering-Stil sehen, den du gewählt hast. Wähle eins aus, und das gerenderte Markdown wirkt sofort veröffentlichungsreif — direkt in diesem Markdown Viewer.

## Was du mit diesem Online Markdown Viewer tun kannst

- **Beliebiges Markdown einfügen und gerendert sehen** — README, RFC, Changelog, Meeting-Notizen, Design-Doku
- **Ein GitHub-README vor dem Push prüfen** — kaputte Tabellen, tote Links und Formatierungsfehler in der Markdown-Vorschau erkennen
- **Markdown, das dir jemand geschickt hat, im Markdown Viewer ansehen** — eine \`.md\`-Datei in den Viewer ziehen und in Sekunden eine lesbare Seite erhalten
- **Direkt an Ort und Stelle bearbeiten, wenn dir etwas auffällt** — den Viewer ohne Zeichenverlust zum Editor machen
- **Sauberes HTML in die Zwischenablage kopieren** — bereinigt, semantisch, bereit für CMS, Newsletter oder statische Website
- **Einen öffentlichen Freigabelink erzeugen** — jeder Snapshot bekommt eine permanente URL, die das Markdown serverseitig für schnelles, mobilfreundliches Lesen rendert
- **Im Browser bleiben** — alles läuft clientseitig; dein Inhalt bleibt auf deinem Gerät, bis du ihn bewusst teilst

## So funktioniert die Live-Vorschau

1. Füge Markdown in das Viewer-Panel ein oder tippe direkt hinein.
2. Das Vorschaufenster rendert sofort über eine einzige Render-Funktion — GFM, LaTeX, Mermaid, Bilder und Code-Highlighting inklusive.
3. Klicke auf **HTML kopieren**, um genau das Markup zu übernehmen, das auf der Seite erscheint.
4. Klicke auf **Teilen**, um einen Snapshot unter einer stabilen URL auf Basis von Cloudflare D1 zu veröffentlichen.

Eine Pipeline, eine Ausgabe, keine Überraschungen.

## Beispiel: von Markdown zu sauberem HTML

\`\`\`ts
import { renderResult } from '@/lib/render';

const { html } = renderResult('# Hallo\\n\\nSauberes **HTML** mit einem Klick ausgeben.');
// html ist bereinigt, semantisch und identisch mit dem Vorschaufenster
\`\`\`

Dieselbe renderResult-Funktion versorgt die Viewer-Vorschau, die Copy-to-Clipboard-Ausgabe und die serverseitig gerenderte Freigabeseite. Client-HTML wird nie als kanonische Ausgabe vertraut — Share-Datensätze werden auf dem Server immer erneut aus Markdown gerendert.

> Das Ziel war nicht, noch einen Markdown-Formatter zu bauen. Es war ein Markdown Viewer, den man sich als Lesezeichen merkt — schnell geöffnet, ehrlich bei dem, was er rendert, und verlässlich, wenn du den Link teilst.

## Anwendungsfälle

- Eine \`.md\`-Datei ansehen, die dir jemand geschickt hat, ohne erst eine Desktop-App für Markdown zu starten
- Prüfen, wie ein README auf GitHub gerendert wird, bevor du den Commit pushst
- Ein RFC, eine Design-Doku oder eine Meeting-Agenda lesen, die als rohes Markdown angekommen ist
- Kontrollieren, dass ein längerer technischer Beitrag vor der Veröffentlichung korrekt rendert
- Mathematiklastige akademische Notizen oder ML-Dokumentation mit echtem LaTeX vorschauen
- Mermaid-Diagramme ansehen, ohne die CLI zu installieren
- Markdown für Newsletter, E-Mail oder CMS in sauberes HTML umwandeln
- Eine gerenderte Markdown-Seite als öffentlichen, mobilfreundlichen Link teilen

## Warum du diesen Online Markdown Viewer wählen solltest

- **Kostenlos, keine Registrierung** — Seite öffnen und Markdown einfügen
- **Volles GFM + LaTeX + Mermaid + Bilder** — nichts ausgelassen, nichts halb gerendert
- **Live-Vorschau, die zur Ausgabe passt** — keine Abweichung zwischen Viewer, Kopie und Share-Link
- **Saubere, bereinigte HTML-Kopie** — sofort überall einfügbar
- **Teilbare Links** mit serverseitigem Rendering
- **Mehrere Rendering-Themes** — Kombinationen aus Farbe, Schrift und Größe direkt integriert
- **Bearbeiten, wenn du es brauchst** — der Viewer funktioniert auch als leichter Markdown-Editor
- **Mobilfreundliche Share-Seiten** — Leser müssen den Viewer nicht selbst öffnen
- **Bewusst leichtgewichtig** — keine überladene Toolbar, kein Tracking

## Jetzt Markdown ansehen

Füge oben dein Markdown ein, um dieses Beispiel zu ersetzen. Die Markdown-Vorschau aktualisiert sich beim Tippen — Text, Tabellen, Mathematik, Diagramme und Bilder rendern alle in Echtzeit. Wenn die Seite richtig aussieht, kopiere das HTML oder teile den Link. Das ist der ganze Ablauf — ein Online Markdown Viewer mit Live-Vorschau, der so gebaut ist, dass er dir nicht im Weg steht.

[Mehr erfahren auf mdviewer.net](https://mdviewer.net)
`;
