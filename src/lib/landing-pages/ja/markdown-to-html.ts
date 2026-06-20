import { markdownToHtmlInitialMarkdownJa } from '@/lib/landing-pages/content/ja/markdown-to-html';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const faqItems: LandingSectionFaqItem[] = [
  { question: 'このツールは無料ですか？', answer: 'はい。ブラウザでそのまま使える無料ツールです。' },
  { question: 'HTML はコピーできますか？', answer: 'はい。プレビュー結果に対応した HTML をコピーできます。' },
  { question: 'サーバーにアップロードされますか？', answer: '共有リンクを作らない限り、通常の変換はブラウザ内で完結します。' },
];

export const markdownToHtmlLandingPageJa: LandingPageConfig = {
  locale: 'ja',
  slug: 'markdown-to-html',
  path: '/markdown-to-html',
  prerender: true,
  title: 'Markdown から HTML へ変換 - 無料オンラインツール',
  description: '無料の Markdown から HTML への変換ツール。Markdown を貼り付けてプレビューし、HTML をコピーできます。',
  heroTitle: 'Markdown から HTML へ変換',
  heroDescription: 'Markdown をブラウザ内で HTML に変換し、そのままコピーできます。',
  initialMarkdown: markdownToHtmlInitialMarkdownJa,
  schema: [
    ...buildSoftwareSchema(
      {
        title: 'Markdown から HTML へ変換 - 無料オンラインツール',
        description: '無料の Markdown から HTML への変換ツール。Markdown を貼り付けてプレビューし、HTML をコピーできます。',
        path: '/markdown-to-html',
      },
      ['Markdown to HTML', 'MD to HTML', 'Online Markdown converter', 'Copy HTML']
    ),
    ...buildFaqSchema(faqItems),
  ],
  workbenchVariant: {
    exportOptions: ['html'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown から HTML への変換に関するよくある質問',
      description: '日本語向けの簡易プレースホルダー FAQ です。',
      faqItems: faqItems,
    },
  ],
};
