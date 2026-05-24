import { markdownToImageInitialMarkdownZhCn } from '@/lib/landing-pages/content/zh-cn/markdown-to-image';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const faqItems: LandingSectionFaqItem[] = [
  { question: '为什么只导出 PNG？', answer: '因为 Markdown 主要是小字号文本和代码高亮，PNG 能保持边缘清晰。' },
  { question: '图片有水印吗？', answer: '没有，导出的就是当前预览。' },
  { question: '长内容怎么办？', answer: '超出单张画布限制时会自动切成多张 PNG。' },
];

export const markdownToImageLandingPageZhCn: LandingPageConfig = {
  locale: 'zh-cn',
  slug: 'markdown-to-image',
  path: '/markdown-to-image',
  prerender: true,
  title: 'Markdown 转图片 - 免费 PNG 导出工具',
  description: '免费在线 Markdown 转图片工具。把代码、表格、公式和 Mermaid 图表导出成可分享的 PNG。',
  heroTitle: 'Markdown 转图片',
  heroDescription: '把 Markdown 渲染结果直接导出成 PNG，适合社交平台、聊天工具和工单系统。',
  initialMarkdown: markdownToImageInitialMarkdownZhCn,
  schema: [
    ...buildSoftwareSchema(
      {
        title: 'Markdown 转图片 - 免费 PNG 导出工具',
        description: '免费在线 Markdown 转图片工具。把代码、表格、公式和 Mermaid 图表导出成可分享的 PNG。',
        path: '/markdown-to-image',
      },
      ['Markdown 转图片', 'Markdown 转 PNG', '浏览器内导出图片', '支持 Mermaid 和 LaTeX']
    ),
    ...buildFaqSchema(faqItems),
  ],
  workbenchVariant: {
    exportOptions: ['image'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown 转图片常见问题',
      description: '从截图流程切到 Markdown 转图片工具前，最常问的几个问题。',
      faqItems: faqItems,
    },
  ],
};
