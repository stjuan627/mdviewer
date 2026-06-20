import { markdownToPdfInitialMarkdownJa } from '@/lib/landing-pages/content/ja/markdown-to-pdf';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const faqItems: LandingSectionFaqItem[] = [
  { question: 'インストールは必要ですか？', answer: '不要です。ブラウザだけで使えます。' },
  { question: 'PDF にコードや表は入りますか？', answer: 'はい。プレビューに表示される内容をそのまま PDF に出力できます。' },
  { question: 'ローカルで処理されますか？', answer: 'はい。共有リンクを使わない通常操作はブラウザ内で処理されます。' },
];

export const markdownToPdfLandingPageJa: LandingPageConfig = {
  locale: 'ja',
  slug: 'markdown-to-pdf',
  path: '/markdown-to-pdf',
  prerender: true,
  title: 'Markdown から PDF へ変換 - 無料オンライン出力',
  description: 'Markdown を貼り付けてプレビューし、そのまま PDF に出力できる無料オンラインツールです。',
  heroTitle: 'Markdown から PDF へ変換',
  heroDescription: 'Markdown をブラウザ内で確認し、そのまま PDF として保存できます。',
  initialMarkdown: markdownToPdfInitialMarkdownJa,
  schema: [
    ...buildSoftwareSchema(
      {
        title: 'Markdown から PDF へ変換 - 無料オンライン出力',
        description: 'Markdown を貼り付けてプレビューし、そのまま PDF に出力できる無料オンラインツールです。',
        path: '/markdown-to-pdf',
      },
      ['Markdown to PDF', 'MD to PDF', 'Browser PDF export']
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
      title: 'Markdown から PDF への変換に関するよくある質問',
      description: '日本語向けの簡易プレースホルダー FAQ です。',
      faqItems: faqItems,
    },
  ],
};
