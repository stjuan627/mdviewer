import { markdownToHtmlInitialMarkdownZhCn } from '@/lib/landing-pages/content/zh-cn/markdown-to-html';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const faqItems: LandingSectionFaqItem[] = [
  { question: '这个 Markdown 转 HTML 工具免费吗？', answer: '免费，无需注册，也没有使用次数限制。' },
  { question: '输出是干净的 HTML 吗？', answer: '是。输出使用语义化标签，不依赖前端框架运行时。' },
  { question: '可以直接粘贴到 CMS 吗？', answer: '可以，适合 Webflow、Ghost、WordPress、Notion 等常见目标。' },
];

export const markdownToHtmlLandingPageZhCn: LandingPageConfig = {
  locale: 'zh-cn',
  slug: 'markdown-to-html',
  path: '/markdown-to-html',
  prerender: true,
  title: 'Markdown 转 HTML - 免费在线转换器',
  description: '免费在线 Markdown 转 HTML 工具。粘贴或上传 .md，预览结果后复制干净的语义化 HTML。',
  heroTitle: 'Markdown 转 HTML',
  heroDescription: '把 Markdown 快速转换为可直接粘贴的 HTML，适合 CMS、邮件编辑器和 Web 应用。',
  initialMarkdown: markdownToHtmlInitialMarkdownZhCn,
  schema: [
    ...buildSoftwareSchema(
      {
        title: 'Markdown 转 HTML - 免费在线转换器',
        description: '免费在线 Markdown 转 HTML 工具。粘贴或上传 .md，预览结果后复制干净的语义化 HTML。',
        path: '/markdown-to-html',
      },
      ['Markdown 转 HTML', 'MD 转 HTML', '浏览器内转换', '复制 HTML 输出']
    ),
    ...buildFaqSchema(faqItems),
  ],
  workbenchVariant: {
    exportOptions: ['html'],
  },
  sections: [
    {
      id: 'destinations',
      kicker: '使用场景',
      title: '常见落地位置',
      description: '把转换后的 HTML 粘贴到不同系统时，通常有以下几种方式。',
      columns: 3,
      cards: [
        {
          title: 'Notion',
          description: '直接粘贴 HTML，让结构转成原生块。',
          items: ['复制上方 HTML', '粘贴到页面中，标题、列表、表格和代码块会被保留。'],
        },
        {
          title: 'Webflow / Ghost / WordPress',
          description: '通过 HTML 卡片或自定义 HTML 块嵌入。',
          items: ['把输出粘贴到 HTML 容器', '再用你自己的样式系统接管视觉。'],
        },
        {
          title: '邮件或内部系统',
          description: '适合作为富文本片段继续加工。',
          items: ['复制 HTML 片段', '按目标系统需要补充样式或 inline CSS。'],
        },
      ],
    },
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown 转 HTML 常见问题',
      description: '在浏览器里做 Markdown 转 HTML 之前，用户最常问的几个问题。',
      faqItems: faqItems,
    },
  ],
};
