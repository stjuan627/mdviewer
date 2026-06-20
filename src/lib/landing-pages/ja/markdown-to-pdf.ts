import { markdownToPdfInitialMarkdownJa } from '@/lib/landing-pages/content/ja/markdown-to-pdf';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToPdfTitleJa = 'Markdown を PDF に変換 — 無料オンライン MD → PDF コンバーター';
const markdownToPdfDescriptionJa =
  '無料のオンライン Markdown → PDF 変換ツール。.md を貼り付けるかアップロードし、GFM テーブル・コードブロック・LaTeX 数式・Mermaid 図をプレビューしてから PDF を出力。インストール不要、ブラウザだけで完結します。';

const faqItems: LandingSectionFaqItem[] = [
  {
    question: 'Markdown を PDF に変換するのにインストールは必要ですか？',
    answer:
      'いいえ、インストールは一切不要です。この Markdown → PDF コンバーターはブラウザだけで完結します。デスクトップアプリも CLI も、Pandoc や wkhtmltopdf のセットアップも必要ありません。Markdown を貼り付けてプレビューを確認し、「Export PDF」をクリックするだけです。',
  },
  {
    question: 'Markdown ファイルはサーバーにアップロードされますか？',
    answer:
      'いいえ。Markdown のレンダリングと PDF 出力はすべてブラウザ内で処理されます。共有リンクを明示的に作成しない限り、コンテンツはお使いのデバイスの外に出ることはありません。',
  },
  {
    question: '出力した PDF のテキストは選択・検索できますか？',
    answer:
      'はい。出力される PDF は画像を平坦化したものではなく、実際のテキストデータを含んでいます。文章のコピー、注釈の追加、ファイル内の全文検索がそのまま可能です。',
  },
  {
    question: 'コードブロックのシンタックスハイライトは PDF に反映されますか？',
    answer:
      'はい。フェンスドコードブロックに指定した言語に応じたシンタックスハイライトが、ライブプレビューと同じ状態で PDF に出力されます。',
  },
  {
    question: 'LaTeX 数式や Mermaid ダイアグラム入りの Markdown も PDF にできますか？',
    answer:
      'はい。KaTeX でレンダリングされた LaTeX 数式と Mermaid ダイアグラムは、プレビュー上で鮮明な SVG として表示され、PDF 変換後もそのまま維持されます。学術文書や技術資料もきれいに出力できます。',
  },
  {
    question: '用紙サイズや余白（A4、Letter、Legal）は変更できますか？',
    answer:
      'はい。「Export PDF」をクリックするとブラウザの印刷ダイアログが表示され、用紙サイズ（A4・Letter・Legal）、印刷の向き、余白プリセットを自由に選択してから PDF を保存できます。',
  },
  {
    question: 'テキストを貼り付ける代わりに .md ファイルをアップロードできますか？',
    answer:
      'はい。ワークベンチは `.md`、`.markdown`、プレーンテキストファイルのアップロードに対応しています。ファイルを読み込んだら、レンダリング結果を確認して PDF を出力してください。',
  },
  {
    question: 'Pandoc や Typora、wkhtmltopdf とは何が違いますか？',
    answer:
      'Pandoc や wkhtmltopdf はローカル環境へのインストールと設定が必要な CLI ツールです。Typora は有料のデスクトップアプリです。本ツールは無料かつブラウザだけで動作し、GFM・LaTeX・Mermaid をすぐに使える状態で出力できます。「この .md を今すぐ PDF にしたい」というワンショット用途であれば、もっとも手軽な選択肢です。',
  },
];

export const markdownToPdfLandingPageJa: LandingPageConfig = {
  locale: 'ja',
  slug: 'markdown-to-pdf',
  path: '/markdown-to-pdf',
  prerender: true,
  title: markdownToPdfTitleJa,
  description: markdownToPdfDescriptionJa,
  heroTitle: 'Markdown を PDF に変換',
  heroDescription:
    'Markdown を貼り付けるかファイルをアップロードし、ライブプレビューで確認してから PDF を出力。GFM テーブル、シンタックスハイライト付きコード、LaTeX 数式、Mermaid 図のすべてが PDF に反映されます。登録不要・インストール不要・サーバーアップロードなし。',
  initialMarkdown: markdownToPdfInitialMarkdownJa,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToPdfTitleJa,
        description: markdownToPdfDescriptionJa,
        path: '/markdown-to-pdf',
      },
      [
        'Markdown to PDF converter',
        'Markdown PDF 変換',
        'MD to PDF',
        'Markdown を PDF に変換',
        'Markdown PDF 出力 オンライン',
        '無料 Markdown PDF コンバーター',
        '.md を PDF に書き出す',
        'LaTeX 数式付き Markdown PDF 出力',
        'Mermaid 図付き Markdown PDF 変換',
        'GFM Markdown から PDF',
        'シンタックスハイライト付きコード PDF',
        'ブラウザで Markdown PDF 変換',
        'インストール不要 Markdown to PDF',
      ]
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
      title: 'Markdown → PDF 変換のよくある質問',
      description:
        'ブラウザ型の Markdown → PDF コンバーターを使う前に、多くの方が気にするポイントをまとめました。',
      faqItems: faqItems,
    },
  ],
};
