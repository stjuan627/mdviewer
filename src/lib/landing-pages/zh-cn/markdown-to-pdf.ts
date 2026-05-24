import { markdownToPdfInitialMarkdownZhCn } from '@/lib/landing-pages/content/zh-cn/markdown-to-pdf';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const faqItems: LandingSectionFaqItem[] = [
  { question: '需要安装软件吗？', answer: '不需要，直接在浏览器里完成。' },
  { question: '内容会上传到服务器吗？', answer: '不会。渲染和导出都在本地完成，除非你主动创建分享链接。' },
  { question: '代码高亮、公式和 Mermaid 会保留吗？', answer: '会，预览里能看到的内容会一起进入 PDF。' },
];

export const markdownToPdfLandingPageZhCn: LandingPageConfig = {
  locale: 'zh-cn',
  slug: 'markdown-to-pdf',
  path: '/markdown-to-pdf',
  prerender: true,
  title: 'Markdown 转 PDF - 免费在线导出',
  description: '免费在线 Markdown 转 PDF 工具。支持 GFM、代码高亮、LaTeX 数学公式和 Mermaid 图表。',
  heroTitle: 'Markdown 转 PDF',
  heroDescription: '粘贴或上传 Markdown，先看预览，再导出排版稳定的 PDF。',
  initialMarkdown: markdownToPdfInitialMarkdownZhCn,
  schema: [
    ...buildSoftwareSchema(
      {
        title: 'Markdown 转 PDF - 免费在线导出',
        description: '免费在线 Markdown 转 PDF 工具。支持 GFM、代码高亮、LaTeX 数学公式和 Mermaid 图表。',
        path: '/markdown-to-pdf',
      },
      ['Markdown 转 PDF', '浏览器内导出 PDF', '支持 GFM、LaTeX 和 Mermaid']
    ),
    ...buildFaqSchema(faqItems),
  ],
  workbenchVariant: {
    exportOptions: ['pdf'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown 转 PDF 常见问题',
      description: '使用浏览器内 PDF 导出前，最常见的几个问题。',
      faqItems: faqItems,
    },
  ],
};
