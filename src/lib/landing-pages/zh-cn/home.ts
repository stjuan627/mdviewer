import { homeInitialMarkdownZhCn } from '@/lib/landing-pages/content/zh-cn/home';
import { buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const homeLandingPageZhCn: LandingPageConfig = {
  locale: 'zh-cn',
  slug: 'home',
  path: '/',
  prerender: true,
  title: '在线 Markdown 预览器 - MD Viewer',
  description:
    '免费的在线 Markdown 预览器，支持实时渲染 GFM、LaTeX 数学公式和 Mermaid 图表。可复制干净 HTML、导出 PDF 或 PNG。',
  heroTitle: '在线 Markdown 预览器',
  heroDescription: '粘贴任意 Markdown，立即查看渲染结果。支持 GFM、LaTeX、Mermaid、HTML 复制、PDF 导出和 PNG 导出。',
  initialMarkdown: homeInitialMarkdownZhCn,
  schema: buildSoftwareSchema(
    {
      title: '在线 Markdown 预览器 - MD Viewer',
      description:
        '免费的在线 Markdown 预览器，支持实时渲染 GFM、LaTeX 数学公式和 Mermaid 图表。可复制干净 HTML、导出 PDF 或 PNG。',
      path: '/',
    },
    ['在线 Markdown 预览', '实时渲染', 'GFM、LaTeX 和 Mermaid', 'HTML 复制', 'PDF 导出', 'PNG 导出']
  ),
  workbenchVariant: {
    exportOptions: ['html', 'pdf', 'image'],
  },
  sections: [],
};
