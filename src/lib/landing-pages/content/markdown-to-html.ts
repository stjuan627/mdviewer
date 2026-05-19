export const markdownToHtmlInitialMarkdown = `## Markdown to HTML Converter — Convert Markdown to clean HTML in your browser

This is a free **Markdown to HTML** converter that turns raw \`.md\` into production-ready HTML inside a single browser tab. Paste Markdown, inspect the rendered output, then copy the generated HTML straight into a CMS, an email builder, a wiki, or your own web app — no install, no signup, no LaTeX toolchain, no Pandoc.

If you searched for *"markdown to html"*, *"convert markdown to html online"*, *"md to html converter"*, *"github markdown to html"*, or *"readme to html"*, this page is built for that exact handoff: bring Markdown in, take clean HTML out.

## Why convert Markdown to HTML?

Markdown is the writing format. HTML is what the destination actually consumes — CMSes, email clients, knowledge bases, transactional templates, and web apps all speak HTML, not raw Markdown. Converting Markdown to HTML closes that gap without forcing you to rewrite content by hand.

Typical reasons people want clean HTML out of Markdown:

- **Publish to a CMS** — paste HTML into Webflow, Ghost, WordPress, Sanity, or a headless CMS without the editor mangling tables and lists.
- **Drop into Notion, Confluence, or wikis** — many rich-text editors accept pasted HTML and render structure that raw Markdown breaks.
- **Build email and newsletter blocks** — generate semantic HTML for Mailchimp, Substack, Beehiiv, or custom transactional emails.
- **Hand off READMEs and docs** — turn GitHub READMEs into browser-ready markup for help centers, partner portals, or product onboarding.
- **Embed in a web app** — feed HTML strings into framework components that expect rendered markup, not a Markdown parser.
- **Migrate content** — move legacy Markdown archives into systems that ingest pasted HTML instead of \`.md\` files.

## How the Markdown to HTML converter works

The flow is intentionally three steps:

1. **Paste or upload Markdown** — drop in raw \`.md\` or upload a Markdown file from disk.
2. **Scan the rendered HTML preview** — verify headings, lists, tables, links, and code blocks look the way the destination expects.
3. **Copy or download the HTML** — grab the HTML snippet, or download an \`.html\` file you can commit or open directly.

| Step | Action | What you get |
| --- | --- | --- |
| 1 | Paste or upload Markdown | Instant rendered preview |
| 2 | Verify the rendered structure | Confidence the HTML matches the destination |
| 3 | Copy HTML or download \`.html\` | Reusable, browser-ready markup |

## What "clean HTML" means in this converter

Not every Markdown-to-HTML tool produces output you can trust in production. Some wrap everything in framework-specific wrapper divs. Some inject tracking attributes. Some flatten semantic tags into styled \`<span>\` soup. This converter aims for the opposite:

- **Semantic tags** — headings use \`<h1>\`–\`<h6>\`, lists use \`<ul>\` / \`<ol>\` / \`<li>\`, tables use \`<table>\` / \`<thead>\` / \`<tbody>\`, code uses \`<pre><code>\`.
- **No framework lock-in** — the HTML does not depend on Tailwind classes, React hydration markers, or build-time hashes.
- **Predictable attributes** — links keep \`href\`, images keep \`src\` and \`alt\`, code fences keep their language hint as a class.
- **No injected scripts or trackers** — what you copy is what you reviewed.

\`\`\`html
<h2>Section title</h2>
<p>Paragraph text with <strong>emphasis</strong> and <a href="/docs">a link</a>.</p>
<pre><code class="language-ts">const html = renderMarkdown(markdown);</code></pre>
\`\`\`

## GitHub Flavored Markdown features that survive the conversion

- **Headings** keep their hierarchy as semantic heading tags.
- **Tables** render as proper \`<table>\` markup with column alignment.
- **Task lists** convert to checkbox-style list items.
- **Fenced code blocks** keep language-aware class hints for syntax highlighting.
- **Footnotes**, **strikethrough**, and **autolinks** all survive cleanly.
- **Inline code**, **bold**, and **italic** stay as \`<code>\`, \`<strong>\`, and \`<em>\`.

If your Markdown also includes LaTeX math or Mermaid diagrams, the preview will render them for visual verification — but the cleanest HTML pastes for CMS and email destinations are usually the GFM features above.

## Markdown to HTML vs. other approaches

| Tool | Install required | Live preview | HTML snippet ready to copy | Cost |
| --- | --- | --- | --- | --- |
| **This converter** | No | Yes | Yes | Free |
| Pandoc | Yes (CLI) | No | Yes | Free |
| Static site generator (Astro, Hugo, Eleventy) | Yes | Partial | Not immediate | Varies |
| Typora | Yes (desktop) | Yes | Partial | Paid |
| Pasting raw Markdown into a CMS | No | Partial | No (often breaks) | Varies |

For a "I just need this Markdown as HTML right now" task, a browser-based converter beats spinning up a build chain or a CLI.

## Final checklist before copying HTML

- [x] Paste or upload your Markdown
- [ ] Confirm headings, lists, tables, and code blocks look right in the preview
- [ ] Click **Copy HTML** for paste, or download an \`.html\` file
- [ ] Drop the HTML into your CMS, email tool, wiki, or web app
- [ ] Style it with your own CSS — the class names stay predictable

Replace this sample with your own Markdown above to start converting.
`;
