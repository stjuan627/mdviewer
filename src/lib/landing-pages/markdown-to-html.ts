import { markdownToHtmlInitialMarkdown } from '@/lib/landing-pages/content/markdown-to-html';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToHtmlTitle = 'Markdown to HTML Converter — Free Online MD to HTML Tool';
const markdownToHtmlDescription =
  'Free online Markdown to HTML converter. Paste or upload .md, preview the rendered result, and copy clean semantic HTML you can drop straight into a CMS, email builder, or web app — no install, no signup.';

const markdownToHtmlFaqItems: LandingSectionFaqItem[] = [
  {
    question: 'Is this Markdown to HTML converter free?',
    answer:
      'Yes. The Markdown to HTML converter is free to use with no signup, no account, and no usage cap on conversions. Paste Markdown, inspect the rendered preview, and copy the HTML.',
  },
  {
    question: 'Does the output produce clean, semantic HTML?',
    answer:
      'Yes. Headings render as `<h1>`–`<h6>`, lists as `<ul>` / `<ol>`, tables as proper `<table>` markup, and code as `<pre><code>`. The HTML does not include framework-specific classes, hydration markers, or tracking attributes — it is safe to paste into a CMS, an email template, or a custom web app.',
  },
  {
    question: 'Can I paste the converted HTML into Notion, Webflow, Ghost, or WordPress?',
    answer:
      'Yes. The exported HTML uses standard tags that rich-text editors and CMS importers know how to ingest. Notion accepts pasted HTML; Webflow, Ghost, and WordPress accept it inside their HTML embed or code blocks. For destinations that strip class attributes, the underlying tag structure still survives.',
  },
  {
    question: 'Is the HTML safe to use in email newsletters?',
    answer:
      'The converter outputs semantic HTML that is a clean starting point for newsletter tools like Mailchimp, Substack, Beehiiv, or transactional email templates. Most email clients still expect inline styles for full visual fidelity, so plan to add or inline CSS on top of the converted HTML for production email.',
  },
  {
    question: 'Does the HTML keep syntax highlighting for code blocks?',
    answer:
      'Yes. Fenced code blocks declared with a language hint (e.g. ```` ```ts ````) keep language-aware token markup, so you can style syntax highlighting from your own CSS theme without re-parsing the code.',
  },
  {
    question: 'Can I upload a `.md` file instead of pasting text?',
    answer:
      'Yes. The workbench accepts `.md`, `.markdown`, and plain text files. Drop a file in, verify the rendered HTML preview, then copy or download the HTML output.',
  },
  {
    question: 'Is my Markdown uploaded to a server during conversion?',
    answer:
      'No. The Markdown to HTML conversion runs locally in your browser tab. Your content stays on your device unless you intentionally generate a share link, which is opt-in.',
  },
  {
    question: 'How is this different from Pandoc or a static site generator?',
    answer:
      'Pandoc is a CLI tool aimed at scripted batch conversion. Static site generators (Astro, Hugo, Eleventy) assume a full project with config and build output. This Markdown to HTML converter is built for the one-off case: open a tab, paste Markdown, walk away with the HTML snippet, no install or scaffolding.',
  },
  {
    question: 'Can I convert HTML back to Markdown here?',
    answer:
      'No — this tool runs one direction: Markdown to HTML. For the reverse conversion, use a dedicated HTML to Markdown tool or library; the canonical source of truth in this workflow is the Markdown.',
  },
];

export const markdownToHtmlLandingPage: LandingPageConfig = {
  slug: 'markdown-to-html',
  path: '/markdown-to-html',
  prerender: true,
  title: markdownToHtmlTitle,
  description: markdownToHtmlDescription,
  heroTitle: 'Markdown to HTML Converter',
  initialMarkdown: markdownToHtmlInitialMarkdown,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToHtmlTitle,
        description: markdownToHtmlDescription,
        path: '/markdown-to-html',
      },
      [
        'Markdown to HTML converter',
        'MD to HTML',
        'Convert Markdown to HTML online',
        'Free Markdown to HTML converter',
        'Online MD to HTML tool',
        '.md to HTML export',
        'Copy HTML from Markdown',
        'Download rendered Markdown as HTML',
        'README to HTML converter',
        'GitHub Markdown to HTML',
        'GFM to HTML converter',
        'Markdown to semantic HTML',
        'Clean Markdown to HTML output',
        'Markdown to HTML with code blocks',
        'Markdown to HTML for email newsletters',
        'Markdown to HTML for Notion paste',
        'Markdown to HTML for Webflow',
        'Markdown to HTML for Ghost CMS',
        'Markdown to HTML for WordPress',
        'Live Markdown preview before HTML copy',
        'Browser-based Markdown HTML converter',
        'No-install Markdown to HTML',
      ]
    ),
    ...buildFaqSchema(markdownToHtmlFaqItems),
  ],
  workbenchVariant: {
    exportOptions: ['html'],
  },
  sections: [
    {
      id: 'destinations',
      kicker: 'How to paste it',
      title: 'Pasting Markdown-converted HTML into common destinations',
      description:
        'The Markdown-to-HTML output is generic and semantic, but each destination accepts HTML in a slightly different place. Quick reference for the most common ones.',
      columns: 3,
      cards: [
        {
          title: 'Notion',
          description: 'Notion converts pasted HTML into native blocks.',
          items: [
            'Copy HTML from the workbench above.',
            'Paste into a Notion page — headings, lists, tables, and code blocks become native Notion blocks.',
          ],
        },
        {
          title: 'Webflow',
          description: 'Use the **Embed** element for raw HTML.',
          items: [
            'Drag an Embed element into the page.',
            'Paste the converted HTML; style with your existing Webflow CSS classes.',
          ],
        },
        {
          title: 'Ghost',
          description: 'Use the **HTML card** in the Ghost editor.',
          items: [
            'Insert an HTML card and paste the converted markup.',
            'Ghost preserves the semantic structure inside the published post.',
          ],
        },
        {
          title: 'WordPress',
          description: 'Use the **Custom HTML** block (Gutenberg) or HTML view (Classic).',
          items: [
            'Add a Custom HTML block and paste the converted HTML.',
            'Switch to preview to confirm tables and code blocks render correctly.',
          ],
        },
        {
          title: 'Mailchimp / Substack',
          description: 'Most newsletter tools accept pasted HTML in a code/HTML block.',
          items: [
            'Paste into the Code or HTML block in the campaign editor.',
            'Add inline styles on top for Outlook and Gmail rendering parity.',
          ],
        },
        {
          title: 'Static sites and frameworks',
          description: 'Use the HTML inside an MDX, Astro, or framework partial.',
          items: [
            'Save as an `.html` file or inline into a component.',
            'Class names stay predictable so your own CSS theme takes over.',
          ],
        },
      ],
    },
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown to HTML converter — frequently asked questions',
      description:
        'The practical questions people ask before trusting a browser-based Markdown to HTML tool with real content.',
      faqItems: markdownToHtmlFaqItems,
    },
  ],
};
