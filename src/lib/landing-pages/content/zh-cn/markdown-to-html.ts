export const markdownToHtmlInitialMarkdownZhCn = `## Markdown 转 HTML 转换器：在浏览器里把 Markdown 变成干净的 HTML

这是一款免费的 **Markdown 转 HTML** 工具，只需一个浏览器标签页，就能把原始的 \`.md\` 转成可直接使用的 HTML。你可以先粘贴 Markdown，确认渲染效果，再把生成的 HTML 直接复制到 CMS、邮件编辑器、Wiki，或你自己的 Web 应用里。无需安装、无需注册，也不必准备 LaTeX 工具链或 Pandoc。

如果你搜索过 *"markdown to html"*、*"convert markdown to html online"*、*"md to html converter"*、*"github markdown to html"* 或 *"readme to html"*，那这个页面就是为这类内容交接场景准备的：把 Markdown 带进来，再把干净的 HTML 带出去。

## 为什么要把 Markdown 转成 HTML？

Markdown 是写作格式，但大多数目标系统真正消费的内容格式其实是 HTML。CMS、邮件客户端、知识库、事务性邮件模板、Web 应用，认的都是 HTML，而不是原始 Markdown。把 Markdown 转成 HTML，就是在不重新手写一遍内容的前提下，把这道鸿沟补上。

人们想从 Markdown 中拿到干净 HTML，通常是出于以下几类需求：

- **发布到 CMS** —— 把 HTML 粘贴进 Webflow、Ghost、WordPress、Sanity 或 headless CMS，不必担心编辑器把表格和列表搞坏。
- **导入 Notion、Confluence 或 Wiki** —— 很多富文本编辑器都支持直接粘贴 HTML，而原始 Markdown 在这类场景下经常水土不服。
- **制作邮件或 Newsletter 区块** —— 为 Mailchimp、Substack、Beehiiv 或自建的事务性邮件，生成语义化的 HTML。
- **交付 README 和文档** —— 把 GitHub README 转成适合帮助中心、合作伙伴后台或产品 onboarding 的网页内容。
- **嵌入 Web 应用** —— 给只接受渲染结果的前端组件提供 HTML 字符串，而不是再额外塞进一个 Markdown parser。
- **迁移旧内容** —— 把历史 Markdown 归档迁进那些只支持粘贴 HTML、不接受 \`.md\` 文件的系统。

## Markdown 转 HTML 转换器是怎么工作的

整个流程被刻意控制在三步以内：

1. **粘贴或上传 Markdown** —— 直接贴入原始 \`.md\`，或者从本地上传 Markdown 文件。
2. **查看渲染后的 HTML 预览** —— 确认标题、列表、表格、链接和代码块都符合目标系统的预期。
3. **复制或下载 HTML** —— 拿走 HTML 片段，或者下载一个可以直接提交、直接打开的 \`.html\` 文件。

| Step | Action | What you get |
| --- | --- | --- |
| 1 | Paste or upload Markdown | Instant rendered preview |
| 2 | Verify the rendered structure | Confidence the HTML matches the destination |
| 3 | Copy HTML or download \`.html\` | Reusable, browser-ready markup |

## 在这个转换器里，"干净 HTML" 究竟意味着什么

并不是每一款 Markdown 转 HTML 工具，输出的结果都能直接拿去用在生产环境。有的会套上一层框架专属的 wrapper div，有的会塞进追踪属性，还有的干脆把语义标签打散成一堆带样式的 \`<span>\`。这个转换器追求的恰恰相反：

- **语义化标签** —— 标题用 \`<h1>\`–\`<h6>\`，列表用 \`<ul>\` / \`<ol>\` / \`<li>\`，表格用 \`<table>\` / \`<thead>\` / \`<tbody>\`，代码用 \`<pre><code>\`。
- **不绑死框架** —— 输出的 HTML 不依赖 Tailwind class、React hydration 标记或构建期 hash。
- **属性可预期** —— 链接保留 \`href\`，图片保留 \`src\` 和 \`alt\`，代码块依然通过 class 携带语言提示。
- **不注入脚本和追踪代码** —— 你复制走的内容，就是你已经亲眼审核过的内容。

\`\`\`html
<h2>Section title</h2>
<p>Paragraph text with <strong>emphasis</strong> and <a href="/docs">a link</a>.</p>
<pre><code class="language-ts">const html = renderMarkdown(markdown);</code></pre>
\`\`\`

## 转换之后依然能保留下来的 GitHub Flavored Markdown 特性

- **标题** 会保留层级，输出为语义化的 heading 标签。
- **表格** 会被转成带列对齐信息的标准 \`<table>\` 结构。
- **任务列表** 会变成带复选框样式的列表项。
- **围栏代码块** 会保留语言感知的 class 提示，方便后续做语法高亮。
- **脚注**、**删除线** 和 **自动链接** 都能完整保留下来。
- **行内代码**、**粗体** 和 **斜体** 依然分别输出为 \`<code>\`、\`<strong>\` 和 \`<em>\`。

如果你的 Markdown 里还混有 LaTeX 公式或 Mermaid 图表，预览区也会一并把它们渲染出来，方便你做视觉确认。不过在 CMS 和邮件这类场景里，真正经常被拿去粘贴的，往往还是上面这些 GFM 特性。

## Markdown 转 HTML 跟其他方案相比怎么样

| Tool | Install required | Live preview | HTML snippet ready to copy | Cost |
| --- | --- | --- | --- | --- |
| **This converter** | No | Yes | Yes | Free |
| Pandoc | Yes (CLI) | No | Yes | Free |
| Static site generator (Astro, Hugo, Eleventy) | Yes | Partial | Not immediate | Varies |
| Typora | Yes (desktop) | Yes | Partial | Paid |
| Pasting raw Markdown into a CMS | No | Partial | No (often breaks) | Varies |

如果你眼前的任务就是"我现在就要把这段 Markdown 变成 HTML"，那浏览器内的转换器通常比拉起一整套构建链或 CLI 都更顺手。

## 复制 HTML 前的最终检查清单

- [x] Paste or upload your Markdown
- [ ] Confirm headings, lists, tables, and code blocks look right in the preview
- [ ] Click **Copy HTML** for paste, or download an \`.html\` file
- [ ] Drop the HTML into your CMS, email tool, wiki, or web app
- [ ] Style it with your own CSS — the class names stay predictable

把上面的示例换成你自己的 Markdown，就可以开始转换了。
`;
