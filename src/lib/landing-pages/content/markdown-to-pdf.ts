export const markdownToPdfInitialMarkdown = `## Markdown to PDF — Convert .md to PDF in your browser

This is a free **markdown to PDF** converter that runs in a single browser tab. Paste any Markdown — a README, a proposal, a meeting note, an RFC, a research write-up — and export a clean, paginated PDF without installing Pandoc, wkhtmltopdf, Typora, or any desktop app. The preview you see on screen is exactly what ends up in the exported PDF file, because the same render pipeline drives both.

If you searched for *"markdown to pdf"*, *"convert markdown to pdf"*, *"export md to pdf online"*, or *"md to pdf converter"*, this is the workflow built for that exact task: paste, review, export. No signup, no install, no upload to a third-party server.

## Why convert Markdown to PDF?

Markdown is the most portable plain-text format for technical writing — but PDF is what people actually *send*. Clients, reviewers, professors, hiring managers, and stakeholders expect a finished document they can open without a Markdown renderer, annotate in Preview or Acrobat, print, and archive. Converting Markdown to PDF closes that gap.

Common reasons to export Markdown as a PDF:

- **Share a polished document** — turn a \`.md\` file into a paginated PDF that anyone can open without a Markdown viewer.
- **Print release notes, proposals, or invoices** — PDF gives you predictable page breaks and printable margins.
- **Archive technical specs and RFCs** — PDF is the long-term-stable format every document system supports.
- **Submit homework, theses, or papers** — most academic portals require PDF, not Markdown.
- **Send a clean handout** — embed code, tables, math, and diagrams in one file with no broken rendering on the recipient's side.
- **Generate a résumé or cover letter from Markdown source** — keep the writing in plain text, ship the PDF.
- **Turn a GitHub README into a printable onboarding doc** — preserve GFM tables, task lists, footnotes, and syntax-highlighted code in a paginated file.
- **Convert meeting notes and agendas to PDF** — give attendees an offline copy with predictable margins and printable page breaks.

## How the markdown to PDF converter works

The flow is three steps and stays in your browser end-to-end:

1. **Paste Markdown** — drop in raw \`.md\` content or upload a Markdown file.
2. **Preview the render** — check headings, lists, tables, code blocks, math, and diagrams in the live preview pane.
3. **Export PDF** — click the **Export PDF** button in the workbench header. Your browser generates the PDF locally and downloads it.

Because the export uses your browser's native print-to-PDF engine, the typography, page breaks, and embedded fonts match what you previewed — no surprises after download.

| Step | Action | What you get |
| --- | --- | --- |
| 1 | Paste or upload Markdown | A live, rendered preview |
| 2 | Verify the layout | Confidence that headings, tables, and code blocks look right |
| 3 | Click Export PDF | A downloadable, paginated PDF file |

## What renders correctly in the PDF

Most online Markdown-to-PDF converters cut corners on the hard parts — tables get mangled, code blocks lose syntax highlighting, math renders as plain text, and Mermaid diagrams disappear entirely. This converter renders every feature you'd expect from a GitHub-quality Markdown viewer, and **carries all of it into the PDF**:

### GitHub Flavored Markdown (GFM)

Full CommonMark plus every GFM extension:

- **Headings** with consistent hierarchy across pages
- **Tables** with column alignment
- **Task lists** with \`- [ ]\` and \`- [x]\` checkboxes
- **Fenced code blocks** with language-aware syntax highlighting
- **Autolinks** for raw URLs
- **Footnotes** for long-form citations
- **Strikethrough** with \`~~text~~\`

\`\`\`ts
// Code blocks keep syntax highlighting in the exported PDF
function convertMarkdownToPdf(markdown: string): Promise<Blob> {
  const html = renderMarkdown(markdown);
  return browser.printToPdf(html);
}
\`\`\`

### LaTeX math equations

Inline math like \`$E = mc^2$\` and display equations render through KaTeX and export cleanly:

$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$

Useful for converting academic Markdown notes, machine-learning READMEs, or technical papers to PDF without screenshotting equations.

### Mermaid diagrams

Flowcharts, sequence diagrams, and state diagrams render as crisp SVG in the preview and stay sharp when exported to PDF:

\`\`\`mermaid
flowchart LR
  MD[Markdown source] --> Preview[Live preview]
  Preview --> PDF[Export PDF]
  PDF --> Send[Send to reviewer]
\`\`\`

### Quotes, callouts, and rich typography

> The preview and the PDF come from the same render pipeline. What you see on screen is what your reader gets in the file — no separate "PDF mode" with different styling.

Quote blocks, emphasis, inline \`code\`, and curly typography all survive the conversion.

## Markdown to PDF vs. other tools

| Tool | Install required | Live preview | GFM + LaTeX + Mermaid | Cost |
| --- | --- | --- | --- | --- |
| **This converter** | No | Yes | Yes | Free |
| Pandoc | Yes (CLI + LaTeX) | No | Partial (config-heavy) | Free |
| wkhtmltopdf | Yes | No | No (HTML only) | Free |
| Typora | Yes (desktop app) | Yes | Yes | Paid |
| VS Code + extension | Yes (editor + plugin) | Yes | Partial | Free |
| MS Word "Save as PDF" | Yes (Office) | Partial | No native Markdown | Paid |

For a one-off "I just need to send this \`.md\` as a PDF" task, a browser-based markdown to pdf converter is almost always the fastest path.

## Final checklist before export

- [x] Paste or upload your Markdown
- [ ] Scan the preview for spacing, table, and code-block issues
- [ ] Confirm math equations and Mermaid diagrams render
- [ ] Click **Export PDF** in the workbench header
- [ ] Choose paper size and margins in the browser print dialog
- [ ] Save the PDF and send it to your reviewer

Replace this sample with your own Markdown above to start converting.
`;
