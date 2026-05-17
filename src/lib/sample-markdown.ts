export const defaultMarkdown = `# Online Markdown Viewer with Live Preview

MD Viewer is a free online markdown viewer that renders any markdown into clean, readable HTML in real time. Paste a README, an RFC, a changelog, or any \`.md\` file and see the rendered output instantly — with GFM tables, LaTeX math, Mermaid diagrams, and syntax-highlighted code, all rendered the way GitHub or your favorite docs site would render them.

Need to tweak the source? The same surface doubles as a lightweight editor — type on the left, watch the markdown preview update on the right, then copy sanitized HTML or share a public link in one click. No account, no install, no friction.

## A markdown viewer that gets the rendering right

Most tools that let you view markdown online cut corners on the hard parts — they skip footnotes, mangle tables, render LaTeX as plain text, or refuse to touch Mermaid. MD Viewer runs your markdown through the same render pipeline whether you're previewing locally, copying HTML, or sharing a public link. What you see in the markdown preview is exactly what your readers will see.

The live preview renders as you paste or type, debounced just enough to stay smooth on long documents — drop in a multi-thousand-word README with diagrams and equations and it stays responsive.

## Full rendering support

### GitHub Flavored Markdown (GFM)

Full CommonMark plus every GFM extension that real-world documents actually use:

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

Paste a GitHub README and the markdown viewer renders it the way GitHub does — no missing checkboxes, no broken tables, no dead footnotes.

### LaTeX math equations

Inline math like \`$E = mc^2$\` and display equations with \`$$ ... $$\` render through KaTeX. Formulas, matrices, summations, and Greek symbols appear correctly inside the markdown preview without a separate viewer or screenshotted equations:


$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$


Perfect for previewing academic papers, machine-learning READMEs, technical notes, and any markdown to HTML workflow that needs real math.

### Mermaid diagrams

Flowcharts, sequence diagrams, class diagrams, Gantt charts, and state diagrams render inline as SVG. Paste a Mermaid block from someone else's doc and the diagram appears immediately — no diagrams.net round-trip, no exported PNGs to track down:

\`\`\`mermaid
flowchart LR
  Paste[Paste markdown] --> Render[Live preview]
  Render --> Copy[Copy clean HTML]
  Render --> Share[Public share link]
\`\`\`

Diagrams travel with your share link and stay sharp at any size.

### Images and rich media

Markdown images render inline at native resolution:

![Alt text describing the image](https://picsum.photos/600/400)

The viewer keeps your image URLs intact in the copied HTML, and the share page serves them responsively for mobile readers. Combined with code, tables, math, and diagrams, you can render and share a complete technical article without leaving this online markdown viewer.

### Keyboard shortcuts

When you do want to edit what you're viewing, the editor surface keeps your hands on the keyboard:

| Shortcut             | Action                       |
| -------------------- | ---------------------------- |
| **Cmd / Ctrl + B**   | Bold selection               |
| **Cmd / Ctrl + I**   | Italic selection             |
| **Cmd / Ctrl + K**   | Insert link                  |
| **Cmd / Ctrl + E**   | Inline code                  |
| **Cmd / Ctrl + S**   | Commit draft / save snapshot |
| **Cmd / Ctrl + /**   | Toggle preview pane          |
| **Tab / Shift+Tab**  | Indent / outdent list items  |

### Multiple rendering themes

Switch between curated themes that pair color palette, typography, and spacing into a single look — so the same markdown can render like a technical doc, a literary essay, an academic paper, or a modern landing page without touching a line of CSS. Each theme tunes:

- **Color scheme** — background, body text, headings, links, code blocks, and quote accents
- **Font family** — serif for long-form reading, sans-serif for product copy, monospace-forward for technical notes, and CJK-friendly stacks
- **Font size and line height** — compact, comfortable, or spacious reading rhythms
- **Heading scale and weight** — from understated editorial to bold marketing-page hierarchy

Theme choice persists across sessions and is baked into the public share page, so readers see the exact rendering style you picked. Pick one and the rendered markdown instantly looks publication-ready — no design pass required.

## What you can do with this online markdown viewer

- **Paste any markdown and see it rendered** — README, RFC, changelog, meeting notes, design doc
- **Preview a GitHub README before you push** — catch broken tables, dead links, and formatting bugs in the markdown preview
- **View markdown shared by someone else** — drop their \`.md\` into the viewer, get a readable page in seconds
- **Edit in place when you spot something to fix** — promote the viewer to the editor without losing a character
- **Copy clean HTML to your clipboard** — sanitized, semantic, ready to paste into a CMS, newsletter, or static site
- **Generate a public share link** — every snapshot gets a permanent URL that renders the markdown server-side for fast, mobile-friendly reading
- **Stay in the browser** — everything runs client-side; your content stays on your device until you choose to share it

## How the live preview works

1. Paste or type markdown into the viewer panel.
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

The same renderResult function powers the viewer preview, the copy-to-clipboard payload, and the server-rendered share page. Client HTML is never trusted as canonical output — share records are always re-rendered from markdown on the server.

> The goal was not to build another markdown formatter. It was a markdown viewer worth bookmarking — fast to open, honest about what it renders, and trustworthy when you share the link.

## Use cases

- Viewing a \`.md\` file someone sent you without firing up a desktop markdown app
- Previewing how a README will render on GitHub before you push the commit
- Reading an RFC, design doc, or meeting agenda that arrived as raw markdown
- Checking that a long-form technical post renders correctly before publishing
- Previewing math-heavy academic notes or ML documentation with real LaTeX
- Viewing Mermaid diagrams without installing the CLI
- Converting markdown to clean HTML for a newsletter, email, or CMS
- Sharing a rendered markdown page as a public, mobile-friendly link

## Why pick this online markdown viewer

- **Free, no signup** — open the page and paste
- **Full GFM + LaTeX + Mermaid + images** — nothing skipped, nothing half-rendered
- **Live preview that matches the output** — zero drift between viewer, copy, and share
- **Clean, sanitized HTML copy** — paste-ready anywhere
- **Shareable links** with server-side rendering
- **Multiple rendering themes** — color, font, and size combinations baked in
- **Edit when you need to** — the viewer doubles as a lightweight markdown editor
- **Mobile-friendly share pages** — readers do not need to open the viewer themselves
- **Lightweight by design** — no bloated toolbar, no tracking

## Start viewing

Paste your markdown above to replace this sample. The markdown preview updates as you type — text, tables, math, diagrams, and images all render in real time. When the page looks right, copy the HTML or share the link. That is the whole loop — an online markdown viewer with live preview, designed to get out of your way.

[Learn more at mdviewer.net](https://mdviewer.net)
`;
