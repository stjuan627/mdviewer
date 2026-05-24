export const markdownToImageInitialMarkdownZhCn = `## Markdown 转图片：告别截图，把 .md 直接变成可分享的 PNG

这是一款基于浏览器的 **markdown 转图片** 工具，专为这样的场景而生：原始 Markdown 直接发出去太乱，手动截图又嫌麻烦。无论是 README、发布说明、代码片段、架构图还是清单，粘贴进来即可拿到一张干净的 PNG，随手发到 Twitter/X、LinkedIn、Slack、Discord、GitHub Issue 或幻灯片中都没问题。

如果你正在搜索 *"markdown to image"*、*"markdown to png"*、*"markdown screenshot generator"*、*"convert markdown to picture"*、*"code snippet to image"*，或者想找一款 **真正读得懂完整 Markdown 的 Carbon 替代品**，那这个页面就是为你准备的。

## 为什么要把 Markdown 转成图片，而不是 HTML 或 PDF？

[Markdown 转 **HTML**](/markdown-to-html) 更适合发布场景，毕竟目标系统本身就会继续渲染这些 markup；[Markdown 转 **PDF**](/markdown-to-pdf) 则更适合归档和正式投递。Markdown 转 **图片** 占据的是中间地带：聊天会话、社交时间线、幻灯片、状态更新、状态页和 bug 报告。在这些场景里，接收方往往只想“看到内容”，而不愿自己再渲染一遍。

人们之所以会去找 markdown 转图片工具，通常出于以下几种需求：

- 想把一段排版完整的内容发到 **Twitter/X、LinkedIn、Bluesky、Threads 或 Mastodon**，又不希望原始的 \`*星号*\` 和 \`# 井号\` 直接暴露在外。
- 想把代码评审摘要、堆栈追踪或错误日志，作为图片发到 **Slack、Discord 或 Microsoft Teams**。
- 想把渲染好的 \`.md\` 快照贴到 **GitHub Issue、Linear 工单或 Notion 页面**，确保格式不会跑偏。
- 想用一套可复用、稳定可靠的图片导出流程，替代 **GitHub README 预览、VS Code 预览窗格或文档站的手动截图**。
- 想把 **代码块、Mermaid 图表或 LaTeX 公式** 导出为独立的视觉素材，方便嵌入幻灯片或课程资料。

这也是大量用户最初搜索这类工具的入口：*Carbon* 和 *ray.so* 处理短代码片段没问题，可它们读不懂完整 Markdown，没有表格、没有任务列表、没有数学公式、没有 Mermaid，也没有引用块。而这款转换器，全都支持。

## 一款让你彻底告别手动截图的 Markdown 截图工具

Markdown 转图片这件事的核心，就是把你从系统截图工具里彻底解放出来。最终导出的 PNG 直接来自渲染后的预览本身，而不是从你的显示器上抠下来一块：

- 导出读取的是 **渲染后的预览本身**，标题、表格和代码块的排版不会被浏览器缩放或窗口大小所干扰。
- 长内容会导出成 **单张长图**，超过画布上限时会自动切成多张 PNG，无需手工拼接。
- 图片以 **视网膜级分辨率（2× device pixels）** 输出，在高分屏、投影仪和社交平台时间线上都足够清晰。
- 文件中 **没有水印、没有品牌条、没有签名**。你下载到的 PNG，就是你要发出去的 PNG。

\`\`\`ts
// PNG export reads the rendered preview, not the screen
export async function shareSnippet(markdown: string) {
  const png = await renderToPng(markdown, { theme: 'paper', scale: 2 });
  return png; // a clean, watermark-free image
}
\`\`\`

## 一款真正吃透完整 Markdown 的 Carbon / ray.so 替代品

Carbon、ray.so 和 polacode 这类代码截图工具，都是围绕单个 fenced code block 设计的。一旦内容里除了代码，还掺杂标题、列表、表格、说明文字或 Mermaid 图表，它们就开始力不从心。

这款转换器从完整的 GitHub Flavored Markdown 出发，因此一张“代码卡片”里可以同时容纳：

- 一个交代片段用途的 **标题**
- 一段解释其作用的 **正文说明**
- 真正的 **带语法高亮的代码块**
- 紧随其后的 **表格、任务列表或提示块**
- 一张可选的 **Mermaid 图表** 或 **LaTeX 公式**

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

## 导出 PNG 时可选的三套内建主题

导出图片会沿用你在预览区中选定的主题，屏幕上看到的视觉风格，会原样延续到最终输出。工作台内建三种预设：

- **Paper** —— 温暖的编辑风格，适合教程、Newsletter、设计更新和产品说明；如果你想要的是“好看”的 markdown to image，而不是终端感十足的截图，这套主题更合适。
- **Blueprint** —— 清晰、技术感更强的高对比度主题，适合变更日志、RFC 和工程公告。
- **Nocturne** —— 真正的 **dark mode**，更适合代码密度高的帖子、dev-twitter 风格卡片，以及希望贴近黑色 IDE 窗口的截图。

导出前先选好主题；最终 PNG 会与预览像素级一致。

## markdown 转 PNG 时，哪些内容能被完整保留下来

由于导出过程是直接把渲染后的预览栅格化，并未切到另一套“图片模式”，所以屏幕上能看到的所有 Markdown 能力，都会原样进入 PNG：

### GitHub Flavored Markdown

- **标题** 拥有稳定的垂直节奏
- **表格** 支持列对齐
- **任务列表** 支持 \`- [ ]\` 与 \`- [x]\` 复选框
- **围栏代码块** 支持按语言识别的语法高亮
- **引用块** 与提示信息
- **脚注**、**自动链接** 与 **删除线**

### LaTeX 数学公式

像 \`$E = mc^2$\` 这样的行内公式，以及块级公式，都会先经 KaTeX 渲染再进入图片导出流程。一段学术内容可以直接输出为干净的 PNG，不必再从 PDF 阅读器里截一次公式。

$$
\\sigma(x) = \\frac{1}{1 + e^{-x}}
$$

### Mermaid 图表

流程图和时序图会在预览区以清晰的 SVG 形式呈现，生成 PNG 时也能保持不错的清晰度：

\`\`\`mermaid
flowchart LR
  Source[Markdown] --> Preview[Themed preview]
  Preview --> Slice[Auto-slice if tall]
  Slice --> PNG[Download .png]
  PNG --> Share[Twitter / Slack / GitHub]
\`\`\`

## 输出细节：尺寸、切片与清晰度

关于最终生成的 PNG，还有几件在实际使用中很重要的事：

- **宽度** 由预览列宽决定，而非浏览器窗口大小，因此同一份 Markdown 的输出宽度，会比手动窗口截图稳定得多。
- **过长内容会自动切片**，当单张 canvas 超过栅格化的安全上限时，会拆分为多个文件（\`-1.png\`、\`-2.png\` ...），长 README 不会被悄悄截断。
- **分辨率** 以 2× device pixels 输出，这个密度对高分屏和会二次压缩的社交平台时间线都更友好。
- **格式只输出 PNG**，且这是刻意为之。PNG 能更好地保住文本边缘、代码块背景和细线条；换成 JPG，小字号文本和语法高亮边缘很容易出现压缩噪点，这与 markdown-to-image 的初衷背道而驰。
- **隐私性**：渲染和栅格化全程在你的浏览器内完成。除非你主动生成分享链接，否则 Markdown 原文与导出的 PNG 都不会离开本地设备。

## 导出前的检查清单

- [x] Paste Markdown or upload a \`.md\` / \`.markdown\` file
- [ ] Pick a theme: **Paper** (warm), **Blueprint** (technical), or **Nocturne** (dark)
- [ ] Scan the preview for spacing around code blocks, tables, and Mermaid
- [ ] Confirm LaTeX equations and emoji render the way you expect
- [ ] Click **Export** in the workbench header and choose **Image (PNG)**
- [ ] If the preview is tall, expect multiple numbered PNG files
- [ ] Drop the file into Twitter/X, LinkedIn, Slack, Discord, GitHub, or your slides

把上面的示例换成你自己的 Markdown，挑好主题，等预览效果满意后即可导出。
`;
