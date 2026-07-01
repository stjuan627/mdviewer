export const markdownToHtmlInitialMarkdownDe = `## Markdown-zu-HTML-Konverter — Markdown zu HTML direkt im Browser umwandeln

Dies ist ein kostenloser **Markdown-zu-HTML-Konverter**, der rohes \`.md\` in einem einzigen Browser-Tab in produktionsreifes HTML umwandelt. Wenn du Markdown zu HTML ohne Installation brauchst, kannst du hier Markdown einfügen, die gerenderte Ausgabe prüfen und das erzeugte HTML direkt in ein CMS, einen E-Mail-Builder, ein Wiki oder deine eigene Web-App kopieren — ohne Registrierung, ohne LaTeX-Toolchain und ohne Pandoc.

Wenn du nach *"markdown zu html"*, *"markdown zu html online"*, *"md zu html"*, *"markdown in html umwandeln"*, *"github markdown zu html"* oder *"readme zu html"* gesucht hast, ist diese Seite genau für diesen Übergang gedacht: Markdown rein, sauberes HTML raus.

## Warum Markdown zu HTML umwandeln?

Markdown ist das Schreibformat. HTML ist das Format, das das Zielsystem tatsächlich verarbeitet — CMS, E-Mail-Clients, Wissensdatenbanken, Transaktionsvorlagen und Web-Apps arbeiten mit HTML, nicht mit rohem Markdown. Markdown zu HTML zu konvertieren schließt diese Lücke, ohne dass du Inhalte von Hand neu formatieren musst.

Typische Gründe, warum Menschen sauberes HTML aus Markdown brauchen:

- **In ein CMS veröffentlichen** — HTML in Webflow, Ghost, WordPress, Sanity oder ein Headless CMS einfügen, ohne dass der Editor Tabellen und Listen zerlegt.
- **In Notion, Confluence oder Wikis einfügen** — viele Rich-Text-Editoren übernehmen eingefügtes HTML sauberer als rohes Markdown.
- **E-Mail- und Newsletter-Blöcke bauen** — semantisches HTML für Mailchimp, Substack, Beehiiv oder benutzerdefinierte Transaktionsmails erzeugen.
- **READMEs und Dokumentation übergeben** — GitHub-READMEs in browserfertiges Markup für Helpcenter, Partnerportale oder Produkt-Onboarding umwandeln.
- **In eine Web-App einbetten** — HTML-Strings an Komponenten übergeben, die gerendertes Markup erwarten, nicht erst einen Markdown-Parser.
- **Inhalte migrieren** — ältere Markdown-Bestände in Systeme verschieben, die eingefügtes HTML statt \`.md\` verarbeiten.

## So funktioniert der Markdown-zu-HTML-Konverter

Der Ablauf besteht bewusst aus drei Schritten:

1. **Markdown einfügen oder hochladen** — rohes \`.md\` einfügen oder eine Markdown-Datei von der Festplatte laden.
2. **Die gerenderte HTML-Vorschau prüfen** — kontrollieren, ob Überschriften, Listen, Tabellen, Links und Codeblöcke so aussehen, wie das Ziel es erwartet.
3. **HTML kopieren oder herunterladen** — den HTML-Snippet übernehmen oder eine \`.html\`-Datei herunterladen, die du direkt committen oder öffnen kannst.

| Schritt | Aktion | Ergebnis |
| --- | --- | --- |
| 1 | Markdown einfügen oder hochladen | Sofortige gerenderte Vorschau |
| 2 | Die gerenderte Struktur prüfen | Sicherheit, dass das HTML zum Ziel passt |
| 3 | HTML kopieren oder \`.html\` herunterladen | Wiederverwendbares, browserfertiges Markup |

## Was „sauberes HTML“ in diesem Konverter bedeutet

Nicht jedes Tool für Markdown zu HTML erzeugt Ausgabe, der du in der Produktion vertrauen kannst. Manche Werkzeuge packen alles in frameworkspezifische Wrapper-Divs. Manche fügen Tracking-Attribute ein. Manche zerlegen semantische Tags in gestylte \`<span>\`-Ketten. Dieser Konverter zielt auf das Gegenteil:

- **Semantische Tags** — Überschriften verwenden \`<h1>\`–\`<h6>\`, Listen \`<ul>\` / \`<ol>\` / \`<li>\`, Tabellen \`<table>\` / \`<thead>\` / \`<tbody>\`, Code \`<pre><code>\`.
- **Kein Framework-Lock-in** — das HTML hängt nicht von Tailwind-Klassen, React-Hydration-Markern oder Build-Hashes ab.
- **Vorhersehbare Attribute** — Links behalten \`href\`, Bilder behalten \`src\` und \`alt\`, Code-Fences behalten ihren Sprachhinweis als Klasse.
- **Keine eingeschleusten Skripte oder Tracker** — was du kopierst, ist das, was du geprüft hast.

\`\`\`html
<h2>Abschnittstitel</h2>
<p>Absatztext mit <strong>Hervorhebung</strong> und <a href="/docs">einem Link</a>.</p>
<pre><code class="language-ts">const html = renderMarkdown(markdown);</code></pre>
\`\`\`

## GitHub-Flavored-Markdown-Funktionen, die bei der Umwandlung erhalten bleiben

- **Überschriften** behalten ihre Hierarchie als semantische Heading-Tags.
- **Tabellen** werden als korrektes \`<table>\`-Markup mit Spaltenausrichtung gerendert.
- **Task-Listen** werden in Checkbox-ähnliche Listeneinträge umgewandelt.
- **Fenced Code Blocks** behalten sprachbezogene Klassenhinweise für Syntax-Highlighting.
- **Fußnoten**, **Durchstreichungen** und **Autolinks** bleiben sauber erhalten.
- **Inline-Code**, **Fettdruck** und **Kursiv** bleiben als \`<code>\`, \`<strong>\` und \`<em>\` bestehen.

Wenn dein Markdown zusätzlich LaTeX-Mathe oder Mermaid-Diagramme enthält, rendert die Vorschau sie zur visuellen Prüfung mit — für die saubersten HTML-Einfügungen in CMS- und E-Mail-Ziele sind meist aber die GFM-Funktionen oben entscheidend.

## Markdown zu HTML im Vergleich zu anderen Ansätzen

| Tool | Installation nötig | Live-Vorschau | HTML-Snippet sofort kopierbar | Kosten |
| --- | --- | --- | --- | --- |
| **Dieser Konverter** | Nein | Ja | Ja | Kostenlos |
| Pandoc | Ja (CLI) | Nein | Ja | Kostenlos |
| Static-Site-Generator (Astro, Hugo, Eleventy) | Ja | Teilweise | Nicht sofort | Variiert |
| Typora | Ja (Desktop) | Ja | Teilweise | Bezahlt |
| Rohes Markdown in ein CMS einfügen | Nein | Teilweise | Nein (führt oft zu Fehlern) | Variiert |

Für die Aufgabe „Ich brauche Markdown zu HTML jetzt sofort“ ist ein browserbasierter Konverter meist schneller als eine Build-Kette oder ein CLI-Setup. Gerade für Markdown zu HTML im Browser ist der direkte Wechsel von Eingabe, Vorschau und HTML-Kopie der eigentliche Vorteil.

## Checkliste vor dem Kopieren des HTML

- [x] Markdown einfügen oder hochladen
- [ ] Prüfen, ob Überschriften, Listen, Tabellen und Codeblöcke in der Vorschau korrekt aussehen
- [ ] Auf **HTML kopieren** klicken oder eine \`.html\`-Datei herunterladen
- [ ] Das HTML in dein CMS, E-Mail-Tool, Wiki oder deine Web-App einfügen
- [ ] Mit deinem eigenen CSS stylen — die Klassennamen bleiben vorhersehbar

Ersetze das Beispiel oben durch dein eigenes Markdown und starte direkt mit der Umwandlung.
`;
