import { markdownToImageInitialMarkdownJa } from '@/lib/landing-pages/content/ja/markdown-to-image';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const faqItems: LandingSectionFaqItem[] = [
  { question: '画像形式は何ですか？', answer: 'PNG を出力します。' },
  { question: '長い内容も出力できますか？', answer: 'はい。長い内容は必要に応じて複数画像に分割されます。' },
  { question: '透かしは入りますか？', answer: 'いいえ。出力はプレビューそのものです。' },
];

export const markdownToImageLandingPageJa: LandingPageConfig = {
  locale: 'ja',
  slug: 'markdown-to-image',
  path: '/markdown-to-image',
  prerender: true,
  title: 'Markdown から画像へ変換 - 無料 PNG 出力ツール',
  description: 'Markdown のプレビュー結果を PNG 画像として出力できる無料オンラインツールです。',
  heroTitle: 'Markdown から画像を生成',
  heroDescription: 'Markdown、コード、表、数式、Mermaid 図を PNG 画像として出力できます。',
  initialMarkdown: markdownToImageInitialMarkdownJa,
  schema: [
    ...buildSoftwareSchema(
      {
        title: 'Markdown から画像へ変換 - 無料 PNG 出力ツール',
        description: 'Markdown のプレビュー結果を PNG 画像として出力できる無料オンラインツールです。',
        path: '/markdown-to-image',
      },
      ['Markdown to image', 'Markdown to PNG', 'Export Markdown image']
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
      title: 'Markdown から画像への変換に関するよくある質問',
      description: '日本語向けの簡易プレースホルダー FAQ です。',
      faqItems: faqItems,
    },
  ],
};
