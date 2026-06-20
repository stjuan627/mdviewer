import { homeInitialMarkdownJa } from '@/lib/landing-pages/content/ja/home';
import { buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const homeLandingPageJa: LandingPageConfig = {
  locale: 'ja',
  slug: 'home',
  path: '/',
  prerender: true,
  title: 'オンライン Markdown Viewer - MD Viewer',
  description:
    '無料のオンライン Markdown Viewer。Markdown を貼り付けて、HTML プレビュー、PDF 出力、PNG 出力をブラウザ内で行えます。',
  heroTitle: 'オンライン Markdown Viewer',
  heroDescription: 'Markdown を貼り付けてすぐにプレビュー。HTML コピー、PDF 出力、PNG 出力に対応しています。',
  initialMarkdown: homeInitialMarkdownJa,
  schema: buildSoftwareSchema(
    {
      title: 'オンライン Markdown Viewer - MD Viewer',
      description:
        '無料のオンライン Markdown Viewer。Markdown を貼り付けて、HTML プレビュー、PDF 出力、PNG 出力をブラウザ内で行えます。',
      path: '/',
    },
    ['Markdown Viewer', 'Markdown preview', 'Markdown to HTML', 'Markdown to PDF', 'Markdown to image']
  ),
  workbenchVariant: {
    exportOptions: ['html', 'pdf', 'image'],
  },
  sections: [],
};
