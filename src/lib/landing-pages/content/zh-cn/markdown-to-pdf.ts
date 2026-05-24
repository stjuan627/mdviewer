export const markdownToPdfInitialMarkdownZhCn = `## Markdown 转 PDF：在浏览器里把 .md 导出成 PDF

这是一款免费的 **markdown 转 PDF** 工具，整个流程都在一个浏览器标签页里完成。无论是 README、提案、会议纪要、RFC 还是研究笔记，只要把 Markdown 粘贴进来，就能导出排版干净、分页清晰的 PDF，不必再装 Pandoc、wkhtmltopdf、Typora 之类的桌面软件。屏幕上看到的预览，就是最终 PDF 里的样子，因为两者共用同一条渲染链路。

如果你曾经搜过 *"markdown to pdf"*、*"convert markdown to pdf"*、*"export md to pdf online"* 或 *"md to pdf converter"*，那这正是为这件事准备的工作流：粘贴、核对、导出。无需注册，无需安装，内容也不会被上传到任何第三方服务器。

## 为什么要把 Markdown 转成 PDF？

Markdown 是技术写作里最便携的纯文本格式之一，但真正会被发出去的成品，往往还是 PDF。客户、评审、教授、招聘经理以及各种干系人，期待打开的是一份不用 Markdown 渲染器就能直接看、能批注、能打印、能归档的最终文档。把 Markdown 转成 PDF，就是补上这道交付环节的最后一公里。

人们常见的导出场景包括：

- **分享一份更完整的成品文档** —— 把 \`.md\` 文件变成谁都能直接打开的分页 PDF，不必先要求对方装 Markdown 查看器。
- **打印发布说明、提案或发票** —— PDF 能给你更可控的分页和打印边距。
- **归档技术规格和 RFC** —— PDF 是几乎所有文档系统都长期支持的稳定格式。
- **提交作业、论文或研究报告** —— 大多数学术系统只接受 PDF，不收 Markdown。
- **发送一份排版完整的讲义** —— 把代码、表格、公式和图表打包成一个文件，接收方不必再跟渲染问题较劲。
- **从 Markdown 源文件生成简历或求职信** —— 内容仍以纯文本维护，对外交付时输出 PDF。
- **把 GitHub README 变成可打印的 onboarding 文档** —— 保留 GFM 表格、任务列表、脚注和代码高亮，以分页文件的形式发出去。
- **把会议纪要和议程导出为 PDF** —— 给参会者一份可离线查看、边距稳定、适合打印的副本。

## Markdown 转 PDF 转换器是怎么工作的

整个流程只有三步，而且全程都在浏览器里完成：

1. **粘贴 Markdown** —— 直接贴入原始 \`.md\` 内容，或者上传一个 Markdown 文件。
2. **核对渲染预览** —— 在实时预览区检查标题、列表、表格、代码块、公式和图表是否符合预期。
3. **导出 PDF** —— 点击工作台顶部的 **Export PDF** 按钮，浏览器会在本地生成 PDF 并下载到本机。

因为导出走的是浏览器原生的 print-to-PDF 引擎，最终 PDF 的排版、分页和字体嵌入效果会尽量贴近预览区所见，下载之后不会再冒出额外的意外。

| Step | Action | What you get |
| --- | --- | --- |
| 1 | Paste or upload Markdown | A live, rendered preview |
| 2 | Verify the layout | Confidence that headings, tables, and code blocks look right |
| 3 | Click Export PDF | A downloadable, paginated PDF file |

## 哪些内容能被完整带进 PDF

很多在线 Markdown 转 PDF 工具，恰恰会在最棘手的部分掉链子：表格挤变形、代码块丢高亮、数学公式退化成纯文本，Mermaid 图表干脆直接消失。而这个转换器会把你在 GitHub 级 Markdown 查看器里期待看到的能力都保留下来，并且 **原样带进 PDF**：

### GitHub Flavored Markdown（GFM）

完整支持 CommonMark，并补齐了常用的 GFM 扩展：

- **标题** 跨页时仍能保持清晰的层级关系
- **表格** 支持列对齐
- **任务列表** 支持 \`- [ ]\` 和 \`- [x]\` 复选框
- **围栏代码块** 支持语言感知的语法高亮
- **自动链接** 支持裸 URL
- **脚注** 适用于长文引用
- **删除线** 支持 \`~~text~~\`

\`\`\`ts
// Code blocks keep syntax highlighting in the exported PDF
function convertMarkdownToPdf(markdown: string): Promise<Blob> {
  const html = renderMarkdown(markdown);
  return browser.printToPdf(html);
}
\`\`\`

### LaTeX 数学公式

像 \`$E = mc^2$\` 这样的行内公式，以及块级数学公式，都会经由 KaTeX 渲染，并能干净地导出：

$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$

这对把学术笔记、机器学习 README 或技术论文导出成 PDF 特别有用，不必再为每条公式单独截图。

### Mermaid 图表

流程图、时序图和状态图会在预览区以清晰的 SVG 形式渲染，导出为 PDF 后依然保持锐利：

\`\`\`mermaid
flowchart LR
  MD[Markdown source] --> Preview[Live preview]
  Preview --> PDF[Export PDF]
  PDF --> Send[Send to reviewer]
\`\`\`

### 引用块、强调，以及更细致的排版

> The preview and the PDF come from the same render pipeline. What you see on screen is what your reader gets in the file — no separate "PDF mode" with different styling.

引用块、强调文字、行内 \`code\` 以及其他细节排版，都会原汁原味地保留到最终导出的文件中。

## Markdown 转 PDF 与其他工具相比如何

| Tool | Install required | Live preview | GFM + LaTeX + Mermaid | Cost |
| --- | --- | --- | --- | --- |
| **This converter** | No | Yes | Yes | Free |
| Pandoc | Yes (CLI + LaTeX) | No | Partial (config-heavy) | Free |
| wkhtmltopdf | Yes | No | No (HTML only) | Free |
| Typora | Yes (desktop app) | Yes | Yes | Paid |
| VS Code + extension | Yes (editor + plugin) | Yes | Partial | Free |
| MS Word "Save as PDF" | Yes (Office) | Partial | No native Markdown | Paid |

如果你的需求只是“把这份 \`.md\` 一次性发给别人，而且格式不能崩”，那浏览器里的 markdown to pdf 转换器通常是最省事的路径。

## 导出前的最终检查清单

- [x] Paste or upload your Markdown
- [ ] Scan the preview for spacing, table, and code-block issues
- [ ] Confirm math equations and Mermaid diagrams render
- [ ] Click **Export PDF** in the workbench header
- [ ] Choose paper size and margins in the browser print dialog
- [ ] Save the PDF and send it to your reviewer

把上面的示例换成你自己的内容，就可以开始导出了。
`;
