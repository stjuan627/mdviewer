export const markdownToImageInitialMarkdown = `## Markdown to Image — turn .md into a shareable PNG, without screenshots

A browser-based **markdown to image** generator built for the moment when raw Markdown is too messy to share but a manual screenshot is too fiddly to capture. Drop in a README, a release note, a code snippet, an architecture diagram, or a checklist, and walk away with a clean PNG you can paste into Twitter/X, LinkedIn, Slack, Discord, a GitHub issue, or a slide.

If you came here looking for *"markdown to image"*, *"markdown to png"*, *"markdown screenshot generator"*, *"convert markdown to picture"*, *"code snippet to image"*, or a **Carbon alternative that understands full Markdown** — this page is the workflow built for that.

## Why convert Markdown to an image instead of HTML or PDF?

[Markdown to **HTML**](/markdown-to-html) is for publishing, where the destination renders markup. [Markdown to **PDF**](/markdown-to-pdf) is for documents people open, scroll, and archive. Markdown to **image** is for the destinations in between — chat threads, social timelines, slide frames, status updates, status pages, and bug reports — where the recipient just wants to *see* the content without rendering anything.

Typical reasons people reach for a markdown to image generator:

- Post a polished snippet to **Twitter/X, LinkedIn, Bluesky, Threads, or Mastodon** without exposing raw \`*asterisks*\` and \`# hashes\`.
- Drop a code review summary, a stack trace, or an error log into **Slack, Discord, or Microsoft Teams** as a single image.
- Attach a rendered \`.md\` snapshot to a **GitHub issue, Linear ticket, or Notion page** so the formatting survives.
- Replace **manual screenshots** of the GitHub README preview, VS Code preview pane, or a docs site, with a clean repeatable export.
- Capture a **code block, a Mermaid diagram, or a LaTeX equation** as a self-contained visual asset for slides or a course.

This is also where most people start searching: *Carbon* and *ray.so* are great for short code snippets, but they don't render full Markdown — no tables, no task lists, no math, no Mermaid, no quotes. This converter does.

## Markdown screenshot tool — without taking screenshots

The whole point of a Markdown to image flow is that you stop reaching for the snipping tool. The output is a real rasterized PNG that comes from the rendered preview, not from your monitor:

- The export reads the **rendered preview directly**, so headings, tables, and code keep their layout regardless of your browser zoom or window size.
- Long content scrolls out as a **single tall image, or auto-slices into multiple PNGs** when the page exceeds the canvas limit — no manual stitching.
- The image is rendered at **retina-class resolution (2× device pixels)** so text stays crisp on high-DPI screens, projector displays, and Twitter timelines.
- There is **no watermark, no branding, no signature** burned into the file. The PNG you download is the PNG you ship.

\`\`\`ts
// PNG export reads the rendered preview, not the screen
export async function shareSnippet(markdown: string) {
  const png = await renderToPng(markdown, { theme: 'paper', scale: 2 });
  return png; // a clean, watermark-free image
}
\`\`\`

## A Carbon / ray.so alternative that speaks full Markdown

Code-snippet image tools like Carbon, ray.so, and polacode are built around a single fenced code block. The moment your snippet has a heading, a list, a table, an explanation paragraph, or a Mermaid diagram next to the code, those tools fall apart.

This converter starts from full GitHub Flavored Markdown, so a "code card" can include:

- A **heading** introducing the snippet
- A **prose paragraph** explaining what it does
- The actual **fenced code block with syntax highlighting**
- A follow-up **table, task list, or callout**
- An optional **Mermaid diagram** or **LaTeX equation**

\`\`\`ts
// Tables, code, and prose all export together
function highlight(snippet: string): string {
  return shiki.codeToHtml(snippet, { lang: 'ts' });
}
\`\`\`

| Feature                                 | Carbon / ray.so | This Markdown to image tool |
| ---                                     | ---             | ---                         |
| Render fenced code block                | Yes             | Yes                         |
| Headings, lists, tables, quotes         | No              | Yes                         |
| GFM task lists \`- [ ]\`                  | No              | Yes                         |
| LaTeX math (KaTeX)                      | No              | Yes                         |
| Mermaid diagrams                        | No              | Yes                         |
| Long-form Markdown notes                | No              | Yes (auto-sliced)           |
| Watermark / branded chrome              | Optional        | None                        |

## Three built-in themes for the exported PNG

The image inherits the same theme you pick in the preview, so the visual style of the export matches what you reviewed on screen. Three presets ship with the workbench:

- **Paper** — warm editorial styling, well-suited for tutorials, newsletters, design updates, and product write-ups where you want a *beautiful markdown to image* feel rather than a terminal aesthetic.
- **Blueprint** — crisp technical styling with high-contrast text, sized for changelogs, RFCs, and engineering announcements.
- **Nocturne** — true **dark mode**, optimized for code-heavy posts, dev-twitter style cards, and screenshots that need to sit comfortably next to a black IDE window.

Pick the theme before exporting; the rendered PNG matches the preview pixel-for-pixel.

## What survives the markdown to PNG conversion

Because the export rasterizes the rendered preview directly — not a separate "image mode" — every Markdown feature you can see on screen ends up in the PNG:

### GitHub Flavored Markdown

- **Headings** with consistent vertical rhythm
- **Tables** with column alignment
- **Task lists** with \`- [ ]\` and \`- [x]\` checkboxes
- **Fenced code blocks** with language-aware syntax highlighting
- **Blockquotes** and callouts
- **Footnotes**, **autolinks**, and **strikethrough**

### LaTeX math equations

Inline math like \`$E = mc^2$\` and display equations render through KaTeX before the image is captured, so an academic snippet exports as a clean PNG without screenshotting equations from a PDF reader.

$$
\\sigma(x) = \\frac{1}{1 + e^{-x}}
$$

### Mermaid diagrams

Flowcharts and sequence diagrams render as crisp SVG in the preview and rasterize cleanly when the PNG is generated:

\`\`\`mermaid
flowchart LR
  Source[Markdown] --> Preview[Themed preview]
  Preview --> Slice[Auto-slice if tall]
  Slice --> PNG[Download .png]
  PNG --> Share[Twitter / Slack / GitHub]
\`\`\`

## Output details: dimensions, slicing, and quality

A few practical notes about the PNG you get:

- **Width** is driven by the preview column, not your viewport — so the same Markdown produces a more predictable width than a manual window screenshot.
- **Tall content auto-slices** into multiple PNG files (\`-1.png\`, \`-2.png\`, ...) when a single canvas would exceed the safe rasterizer limit, so a long README never silently truncates.
- **Resolution** renders at 2× device pixels, which is the right density for retina displays and social timelines that re-compress on upload.
- **Format** is PNG only — by design. PNG keeps text edges and code-block backgrounds clean. JPG would introduce compression artifacts around small text and syntax-highlighted code, which is the opposite of what a markdown-to-image flow needs.
- **Privacy**: rendering and rasterization happen in your browser. The Markdown source and the resulting PNG never leave your device unless you explicitly create a share link.

## Pre-export checklist

- [x] Paste Markdown or upload a \`.md\` / \`.markdown\` file
- [ ] Pick a theme: **Paper** (warm), **Blueprint** (technical), or **Nocturne** (dark)
- [ ] Scan the preview for spacing around code blocks, tables, and Mermaid
- [ ] Confirm LaTeX equations and emoji render the way you expect
- [ ] Click **Export** in the workbench header and choose **Image (PNG)**
- [ ] If the preview is tall, expect multiple numbered PNG files
- [ ] Drop the file into Twitter/X, LinkedIn, Slack, Discord, GitHub, or your slides

Replace this sample with your own Markdown above, switch themes, and export when the preview matches the look you want.
`;
