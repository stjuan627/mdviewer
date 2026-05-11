export type ViewDefinition = {
  id: MarkdownBoxView;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
};

export const viewRegistry: Record<MarkdownBoxView, ViewDefinition> = {
  article: {
    id: 'article',
    label: 'Article',
    eyebrow: 'For essays and blog posts',
    title: '把 Markdown 变成更像成品的文章页',
    description: '突出标题、摘要、正文层级、引用和代码块，适合博客、教程和长文发布。',
    cta: '复制这份 HTML 到你的 CMS、博客或静态站。',
  },
  release: {
    id: 'release',
    label: 'Release',
    eyebrow: 'For product updates',
    title: '把同一份 Markdown 变成结构化更新说明',
    description: '强调 highlights、更新分组、版本节奏和链接，适合 changelog 与发布说明。',
    cta: '把结果贴到更新页、邮件或产品公告里。',
  },
};
