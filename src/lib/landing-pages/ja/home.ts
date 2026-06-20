import { homeInitialMarkdownJa } from '@/lib/landing-pages/content/ja/home';
import { buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const homeLandingPageJa: LandingPageConfig = {
  locale: 'ja',
  slug: 'home',
  path: '/',
  prerender: true,
  title: 'オンライン Markdown ビューアー｜リアルタイムプレビュー対応 - MD Viewer',
  description:
    '無料のオンライン Markdown ビューアー。README や技術文書を貼り付けるだけで、GFM テーブル・LaTeX 数式・Mermaid 図をリアルタイムにプレビュー。クリーンな HTML コピー、PDF 出力、PNG 出力、公開共有リンクの発行にも対応。',
  heroTitle: 'オンライン Markdown ビューアー',
  heroDescription:
    'Markdown を貼り付けて、すぐにプレビュー。GFM・LaTeX・Mermaid・コードハイライトに完全対応。HTML コピー、PDF 出力、共有リンク発行がワンクリックで完結します。',
  initialMarkdown: homeInitialMarkdownJa,
  schema: buildSoftwareSchema(
    {
      title: 'オンライン Markdown ビューアー｜リアルタイムプレビュー対応 - MD Viewer',
      description:
        '無料のオンライン Markdown ビューアー。README や技術文書を貼り付けるだけで、GFM テーブル・LaTeX 数式・Mermaid 図をリアルタイムにプレビュー。クリーンな HTML コピー、PDF 出力、PNG 出力、公開共有リンクの発行にも対応。',
      path: '/',
    },
    [
      'オンライン Markdown ビューアー',
      'Markdown リアルタイムプレビュー',
      'GFM・LaTeX・Mermaid レンダリング',
      'Markdown to HTML 変換',
      'PDF エクスポート',
      'クリーンな HTML コピー',
      'Markdown 共有リンク',
      'Markdown Viewer 無料',
    ]
  ),
  workbenchVariant: {
    exportOptions: ['html', 'pdf', 'image'],
  },
  sections: [],
};
