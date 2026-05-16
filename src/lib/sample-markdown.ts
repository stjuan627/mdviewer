export const defaultMarkdown = `# Online Markdown Editor with Live Preview

Markdown Box is a free, full-featured online markdown editor with live preview that turns plain text into clean, shareable HTML right in your browser. Type on the left, watch the rendered output update in real time on the right, then copy sanitized HTML or publish a public share link in one click — no account, no install, no friction.

Built for writers who want **GFM, LaTeX math, Mermaid diagrams, images, keyboard shortcuts, and multiple rendering themes** in a single lightweight markdown editor online.

## A markdown editor built for shipping, not just writing

Most online markdown editors stop at preview. Markdown Box treats the preview as the deliverable. Every keystroke runs through the same render pipeline that powers the share page and the copy-to-clipboard button, so what you see is exactly what your readers will see. No template wrappers, no surprise styling, no drift between editor preview and published page.

This real-time markdown editor renders as you type, debounced just enough to stay smooth on long documents — even a multi-thousand-word draft with diagrams and equations stays responsive.

## Full feature set

### GitHub Flavored Markdown (GFM)

Full CommonMark plus the GFM extensions writers actually use every day:

- **Tables** with column alignment
- **Task lists** with \`- [ ]\` and \`- [x]\` checkboxes
- **Fenced code blocks** with language-aware syntax highlighting
- **Autolinks** for raw URLs
- **Footnotes** for long-form references
- **Strikethrough** with \`~~text~~\`

| Feature        | Supported | Notes                          |
| -------------- | :-------: | ------------------------------ |
| Tables         | yes       | GFM alignment syntax           |
| Task lists     | yes       | Interactive checkboxes in HTML |
| Footnotes      | yes       | Auto-numbered                  |
| Strikethrough  | yes       | \`~~like this~~\`                |

### LaTeX math equations

Write inline math like \`$E = mc^2$\` and full display equations with \`$$ ... $$\`. The live preview renders LaTeX via KaTeX, so formulas, matrices, summations, and Greek symbols all appear inside the markdown preview without a separate editor:

\`\`\`latex
$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$
\`\`\`

Perfect for technical notes, academic writing, machine-learning READMEs, and any markdown to HTML workflow that needs real math instead of screenshotted equations.

### Mermaid diagrams

Draw flowcharts, sequence diagrams, class diagrams, Gantt charts, and state diagrams directly inside a fenced code block. The live preview renders Mermaid as inline SVG, so diagrams travel with your share link and stay sharp at any size:

\`\`\`mermaid
flowchart LR
  Draft[Write markdown] --> Preview[Live preview]
  Preview --> Copy[Copy clean HTML]
  Preview --> Share[Public share link]
\`\`\`

No external diagrams.net round-trip, no exported PNGs to manage — diagrams live in the same markdown source as the rest of your document.

### Images and rich media

Drop images straight into the editor or use standard markdown syntax:

\`\`\`md
![Alt text describing the image](https://example.com/screenshot.png)
\`\`\`

The preview shows images inline at native resolution, the copied HTML keeps your URLs intact, and the share page serves images responsively for mobile readers. Combined with code, tables, math, and diagrams, you can publish a complete technical article without leaving this markdown editor online.

### Keyboard shortcuts

A markdown editor with live preview should keep your hands on the keyboard. Common shortcuts:

| Shortcut             | Action                       |
| -------------------- | ---------------------------- |
| **Cmd / Ctrl + B**   | Bold selection               |
| **Cmd / Ctrl + I**   | Italic selection             |
| **Cmd / Ctrl + K**   | Insert link                  |
| **Cmd / Ctrl + E**   | Inline code                  |
| **Cmd / Ctrl + S**   | Commit draft / save snapshot |
| **Cmd / Ctrl + /**   | Toggle preview pane          |
| **Tab / Shift+Tab**  | Indent / outdent list items  |

Writers used to Notion, Bear, or VS Code feel at home within seconds.

### Multiple rendering themes

Switch between curated themes that pair color palette, typography, and spacing into a single look — so the same markdown can read like a technical doc, a literary essay, an academic paper, or a modern landing page without touching a line of CSS. Each theme tunes:

- **Color scheme** — background, body text, headings, links, code blocks, and quote accents
- **Font family** — serif for long-form reading, sans-serif for product copy, monospace-forward for technical notes, and CJK-friendly stacks
- **Font size and line height** — compact, comfortable, or spacious reading rhythms
- **Heading scale and weight** — from understated editorial to bold marketing-page hierarchy

Theme choice persists across sessions and is baked into the public share page, so readers see the exact rendering style you picked. Pick one and your draft instantly looks publication-ready — no design pass required.

## What you can do with this online markdown editor

- **Write and preview side by side** — a true split-pane markdown editor with live rendering
- **Copy clean HTML to your clipboard** — sanitized, semantic, ready to paste into a CMS, newsletter, or static site
- **Generate a public share link** — every snapshot gets a permanent URL that renders the markdown server-side for fast, mobile-friendly reading
- **Round-trip from the viewer** — drop existing markdown into the read-only viewer and promote it to the editor without losing a character
- **Stay in the browser** — the editor lives client-side; your draft stays on your device until you choose to share it

## How the live preview works

1. Type or paste markdown into the editor panel.
2. The preview pane renders instantly through a single render function — GFM, LaTeX, Mermaid, images, and code highlighting all included.
3. Hit **Copy HTML** to grab the exact markup that appears on the page.
4. Hit **Share** to publish a snapshot at a stable URL backed by Cloudflare D1.

One pipeline, one output, zero surprises.

## Example: from markdown to clean HTML

\`\`\`ts
import { renderResult } from "@/lib/render";

const { html } = renderResult("# Hello\\n\\nShip clean **HTML** in one click.");
// html is sanitized, semantic, and identical to the preview pane
\`\`\`

The same renderResult function powers the editor preview, the copy-to-clipboard payload, and the server-rendered share page. Client HTML is never trusted as canonical output — share records are always re-rendered from markdown on the server.

> The goal was not to build another markdown formatter. It was a publishing workbench worth remembering — fast to open, honest about what it produces, and trustworthy when you share the link.

## Use cases

- Drafting a changelog or release note before pasting it into GitHub
- Writing a technical blog post with math equations and flowcharts
- Composing a long-form Slack, Discord, or Notion post that supports markdown
- Documentation for a side project before the docs site exists
- Sharing an RFC, meeting agenda, or design doc as a public link
- Converting markdown to HTML for a newsletter or email campaign
- Previewing how a README will look before you push the commit

## Why pick this markdown editor online

- **Free, no signup** — open the page and start writing
- **Full GFM + LaTeX + Mermaid + images** in one editor
- **Live preview that matches the output** — zero drift
- **Clean, sanitized HTML copy** — paste-ready anywhere
- **Shareable links** with server-side rendering
- **Multiple rendering themes** — color, font, and size combinations baked in
- **Keyboard shortcuts** for every common formatting action
- **Mobile-friendly share pages** — readers do not need the editor
- **Lightweight by design** — no bloated toolbar, no tracking

## Start writing

Replace this sample with your own markdown. The live preview updates as you type — text, tables, math, diagrams, and images all render in real time. When the draft looks right, copy the HTML or share the link. That is the whole loop — an online markdown editor with live preview, designed to get out of your way.

[Learn more at markdown.box](https://markdown.box)
`;
