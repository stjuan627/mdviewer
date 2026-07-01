export const markdownToPdfInitialMarkdownDe = `## Markdown zu PDF - .md im Browser in PDF umwandeln

Das ist ein kostenloser Konverter für **Markdown zu PDF**, der komplett in einem einzigen Browser-Tab läuft. Füge beliebiges Markdown ein - ein README, ein Angebot, ein Meeting-Protokoll, ein RFC oder eine Ausarbeitung - und exportiere eine saubere, paginierte PDF, ohne Pandoc, wkhtmltopdf, Typora oder eine Desktop-App zu installieren. Die Vorschau auf dem Bildschirm entspricht exakt der exportierten PDF-Datei, weil dieselbe Render-Pipeline beides erzeugt.

Wenn du nach *"Markdown zu PDF"*, *"Markdown in PDF umwandeln"*, *"MD zu PDF"* oder *"Markdown als PDF exportieren"* gesucht hast, ist das genau der passende Ablauf für Markdown zu PDF: einfügen, prüfen, exportieren. Kein Login, keine Installation, kein Upload auf einen Drittserver.

## Warum Markdown zu PDF umwandeln?

Markdown ist das portabelste Klartextformat für technisches Schreiben - aber PDF ist das Format, das am Ende tatsächlich verschickt wird. Kunden, Reviewer, Dozenten, Recruiter und andere Beteiligte erwarten ein fertiges Dokument, das sie ohne Markdown-Renderer öffnen, in Vorschau oder Acrobat kommentieren, drucken und archivieren können. Markdown zu PDF umzuwandeln schließt genau diese Lücke.

Typische Gründe, Markdown als PDF zu exportieren:

- **Ein professionelles Dokument teilen** - aus einer \`.md\`-Datei wird eine paginierte PDF, die jede Person ohne Markdown-Viewer öffnen kann.
- **Release Notes, Angebote oder Rechnungen drucken** - eine PDF sorgt für verlässliche Seitenumbrüche und druckbare Ränder.
- **Technische Spezifikationen und RFCs archivieren** - PDF ist das langfristig stabile Format, das jedes Dokumentensystem unterstützt.
- **Hausarbeiten, Abschlussarbeiten oder Paper einreichen** - die meisten Portale verlangen PDF statt Markdown.
- **Ein sauberes Handout versenden** - Code, Tabellen, Formeln und Diagramme landen in einer einzigen Datei, ohne kaputtes Rendering auf Empfängerseite.
- **Lebenslauf oder Anschreiben aus Markdown erstellen** - der Text bleibt in Klartext, verschickt wird die PDF.
- **Ein GitHub-README in ein druckbares Onboarding-Dokument verwandeln** - GFM-Tabellen, Task-Listen, Fußnoten und syntaxhervorgehobener Code bleiben in einer paginierten Datei erhalten.
- **Meeting-Notizen und Tagesordnungen als PDF exportieren** - Teilnehmende bekommen eine Offline-Kopie mit verlässlichen Rändern und druckbaren Seitenumbrüchen.

## So funktioniert Markdown zu PDF im Browser

Der Ablauf für Markdown zu PDF hat drei Schritte und bleibt von Anfang bis Ende im Browser:

1. **Markdown einfügen** - rohen \`.md\`-Inhalt einfügen oder eine Markdown-Datei hochladen.
2. **Rendering prüfen** - Überschriften, Listen, Tabellen, Codeblöcke, Formeln und Diagramme in der Live-Vorschau kontrollieren.
3. **PDF exportieren** - im Header des Workbench-Bereichs auf **PDF exportieren** klicken. Der Browser erzeugt die PDF lokal und lädt sie herunter.

Weil der Export die native Druck-zu-PDF-Engine des Browsers nutzt, entsprechen Typografie, Seitenumbrüche und eingebettete Schriftarten genau der Vorschau - ohne Überraschungen nach dem Download. Wenn du Markdown zu PDF ohne Installation brauchst, ist genau das der Vorteil dieses Ablaufs.

| Schritt | Aktion | Ergebnis |
| --- | --- | --- |
| 1 | Markdown einfügen oder hochladen | Eine live gerenderte Vorschau |
| 2 | Layout prüfen | Sicherheit, dass Überschriften, Tabellen und Codeblöcke korrekt aussehen |
| 3 | Auf PDF exportieren klicken | Eine herunterladbare, paginierte PDF-Datei |

## Was bei Markdown zu PDF korrekt gerendert wird

Viele Online-Tools für Markdown zu PDF sparen gerade bei den schwierigen Fällen - Tabellen verrutschen, Codeblöcke verlieren das Syntax-Highlighting, Formeln erscheinen als Klartext und Mermaid-Diagramme verschwinden komplett. Dieser Konverter rendert alles, was man von einem Markdown-Viewer auf GitHub-Niveau erwartet, und **übernimmt all das auch in die PDF**:

### GitHub Flavored Markdown (GFM)

Vollständiges CommonMark plus alle GFM-Erweiterungen:

- **Überschriften** mit konsistenter Hierarchie über mehrere Seiten hinweg
- **Tabellen** mit Spaltenausrichtung
- **Task-Listen** mit \`- [ ]\`- und \`- [x]\`-Checkboxen
- **Fenced Code Blocks** mit sprachabhängigem Syntax-Highlighting
- **Autolinks** für rohe URLs
- **Fußnoten** für längere Quellenangaben
- **Durchgestrichener Text** mit \`~~text~~\`

\`\`\`ts
// Codeblöcke behalten ihr Syntax-Highlighting auch in der exportierten PDF
function convertMarkdownToPdf(markdown: string): Promise<Blob> {
  const html = renderMarkdown(markdown);
  return browser.printToPdf(html);
}
\`\`\`

### LaTeX-Matheformeln

Inline-Mathematik wie \`$E = mc^2$\` und abgesetzte Gleichungen werden über KaTeX gerendert und sauber exportiert:

$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$

Praktisch, wenn akademische Markdown-Notizen, Machine-Learning-READMEs oder technische Paper als PDF exportiert werden sollen, ohne Formeln als Screenshot einzufügen.

### Mermaid-Diagramme

Flowcharts, Sequenzdiagramme und Zustandsdiagramme werden in der Vorschau als scharfes SVG gerendert und bleiben auch beim Export in PDF gestochen klar:

\`\`\`mermaid
flowchart LR
  MD[Markdown-Quelle] --> Preview[Live-Vorschau]
  Preview --> PDF[PDF exportieren]
  PDF --> Send[Zur Prüfung senden]
\`\`\`

### Zitate, Hinweisboxen und Typografie

> Vorschau und PDF kommen aus derselben Render-Pipeline. Was auf dem Bildschirm zu sehen ist, bekommt die lesende Person auch in der Datei - kein separater PDF-Modus mit anderer Gestaltung.

Blockquotes, Hervorhebungen, inline \`code\` und saubere Typografie überstehen die Umwandlung ebenfalls.

## Markdown zu PDF im Vergleich zu anderen Tools

| Tool | Installation nötig | Live-Vorschau | GFM + LaTeX + Mermaid | Kosten |
| --- | --- | --- | --- | --- |
| **Dieser Konverter** | Nein | Ja | Ja | Kostenlos |
| Pandoc | Ja (CLI + LaTeX) | Nein | Teilweise (konfigurationslastig) | Kostenlos |
| wkhtmltopdf | Ja | Nein | Nein (nur HTML) | Kostenlos |
| Typora | Ja (Desktop-App) | Ja | Ja | Kostenpflichtig |
| VS Code + Erweiterung | Ja (Editor + Plugin) | Ja | Teilweise | Kostenlos |
| MS Word "Als PDF speichern" | Ja (Office) | Teilweise | Kein natives Markdown | Kostenpflichtig |

Für die typische Einmal-Aufgabe *"Ich muss diese \`.md\` nur schnell als PDF verschicken"* ist Markdown zu PDF im Browser fast immer der schnellste Weg. Wer Markdown zu PDF ohne Desktop-App erledigen will, ist hier genau richtig.

## Checkliste vor dem Export

- [x] Markdown einfügen oder hochladen
- [ ] Vorschau auf Abstände, Tabellen und Codeblock-Probleme prüfen
- [ ] Kontrollieren, ob Formeln und Mermaid-Diagramme korrekt gerendert werden
- [ ] Im Header des Workbench-Bereichs auf **PDF exportieren** klicken
- [ ] Im Browser-Druckdialog Papierformat und Ränder wählen
- [ ] PDF speichern und an Empfänger senden

Ersetze dieses Beispiel oben durch dein eigenes Markdown und starte direkt mit Markdown zu PDF.
`;
