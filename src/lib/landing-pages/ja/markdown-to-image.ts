import { markdownToImageInitialMarkdownJa } from '@/lib/landing-pages/content/ja/markdown-to-image';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToImageTitleJa = 'Markdown から画像へ変換 — 無料の Markdown PNG ジェネレーター';
const markdownToImageDescriptionJa =
  '無料のオンライン Markdown → 画像変換ツール。コード、テーブル、数式、Mermaid ダイアグラムを含む Markdown を、ウォーターマークなしの高精細 PNG として出力。Twitter/X・LinkedIn・Slack・GitHub・スライドにそのまま貼り付けできます。';

const markdownToImageFaqItemsJa: LandingSectionFaqItem[] = [
  {
    question: 'Carbon や ray.so、polacode とはどう違いますか？',
    answer:
      'Carbon・ray.so・polacode は単一のフェンスドコードブロック向けに設計されています。本ツールは GitHub Flavored Markdown をフルレンダリングするため、見出し・テーブル・タスクリスト・引用・LaTeX 数式・Mermaid ダイアグラムを含む Markdown 全体を一枚の PNG として出力できます。コード以外の要素も含めて画像化したい場合に最適な Carbon 代替ツールです。',
  },
  {
    question: 'JPG / JPEG 形式で出力できますか？',
    answer:
      '出力は PNG のみです。これは意図的な設計で、Markdown のコンテンツは小さい文字、構文ハイライトされたコード、テーブルの罫線が中心であり、JPG 圧縮ではこれらにノイズが乗りやすくなります。PNG ならテキストの輪郭がシャープに保たれ、Twitter/X・LinkedIn・Slack・Discord・GitHub・Notion など主要プラットフォームすべてで問題なく表示されます。',
  },
  {
    question: '出力画像にウォーターマークやブランドロゴは入りますか？',
    answer:
      '一切入りません。ロゴもシグネチャも焼き込まれず、ダウンロードされる PNG はレンダリングされた Markdown プレビューそのものです。自身のアセットとして自由に使用できます。',
  },
  {
    question: '高解像度 / Retina 対応の画像ですか？',
    answer:
      'はい。2× デバイスピクセルでラスタライズされるため、Retina 品質の出力になります。高解像度ノート PC、4K ディスプレイ、プロジェクター投影、SNS プラットフォームでの再圧縮後でもテキストが鮮明に保たれます。',
  },
  {
    question: '非常に長い Markdown の場合はどうなりますか？',
    answer:
      '長いコンテンツは、単一キャンバスがブラウザのラスタライザ上限を超えた時点で、自動的に番号付きの複数 PNG ファイル（mdviewer-export-1.png、mdviewer-export-2.png …）に分割されます。長い README やチェンジログの末尾がサイレントに切れてしまう心配はありません。',
  },
  {
    question: 'ライトモード・ダークモード・技術系などテーマを選べますか？',
    answer:
      'はい。ワークベンチには 3 つのプリセットが搭載されています：Paper（暖かみのある上品なライトテーマ）、Blueprint（ハイコントラストの技術系テーマ）、Nocturne（コード中心の開発者カードに最適なダークモード）。ツールバーでテーマを切り替えるだけで、PNG に即反映されます。',
  },
  {
    question: 'Markdown がサーバーにアップロードされることはありますか？',
    answer:
      'ありません。Markdown のレンダリングと PNG のラスタライズはすべてブラウザ内で完結します。共有リンクを明示的に作成しない限り、ソーステキストも生成画像もデバイスの外には送信されません。',
  },
  {
    question: 'Twitter/X・LinkedIn・Slack・GitHub にそのまま貼れますか？',
    answer:
      'はい。それがまさに主な用途です。PNG は SNS・チャットツール・Issue トラッカーが標準的に受け付ける形式です。Retina 品質の出力は低解像度のスクリーンショットよりも再圧縮に強く、プレビュー列に基づく固定幅のため、スニッピングツールで起こりがちなトリミングの問題も回避できます。',
  },
  {
    question: 'コードの構文ハイライトは画像に反映されますか？',
    answer:
      'はい。フェンスドコードブロックはライブプレビュー上でハイライトされ、PNG エクスポートはそのハイライト結果をそのままキャプチャします。言語指定・テーマ・インライン `code` のスタイリングもすべて維持されます。',
  },
  {
    question: 'LaTeX 数式や Mermaid ダイアグラム付きの Markdown も画像化できますか？',
    answer:
      'はい。KaTeX による数式と Mermaid ダイアグラムは、PNG 生成前にプレビュー上でレンダリングされます。学術的なスニペットやアーキテクチャ図を、手動でスクリーンショットを撮ることなく一枚の画像として出力できます。',
  },
];

export const markdownToImageLandingPageJa: LandingPageConfig = {
  locale: 'ja',
  slug: 'markdown-to-image',
  path: '/markdown-to-image',
  prerender: true,
  title: markdownToImageTitleJa,
  description: markdownToImageDescriptionJa,
  heroTitle: 'Markdown から画像を生成',
  heroDescription:
    'Markdown・コード・テーブル・数式・Mermaid ダイアグラムを、ウォーターマークなしの高精細 PNG としてワンクリック出力。SNS・チャット・スライドにそのまま貼り付けできます。',
  initialMarkdown: markdownToImageInitialMarkdownJa,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToImageTitleJa,
        description: markdownToImageDescriptionJa,
        path: '/markdown-to-image',
      },
      [
        'Markdown 画像 変換',
        'Markdown PNG 変換',
        'Markdown スクリーンショット ツール',
        'コードスニペット 画像化',
        'Carbon 代替 Markdown 対応',
        'ray.so 代替 テーブル Mermaid 対応',
        'README 画像 変換',
        'Markdown Twitter 画像',
        'Markdown LinkedIn 投稿画像',
        'Markdown Slack 画像',
        'Markdown GitHub Issue 画像',
        'Markdown LaTeX 数式 画像',
        'Markdown Mermaid ダイアグラム 画像',
        'Retina Markdown PNG 出力',
        'ウォーターマークなし Markdown 画像',
        'ダークモード Markdown 画像',
        '長文 Markdown 自動分割 PNG',
      ]
    ),
    ...buildFaqSchema(markdownToImageFaqItemsJa),
  ],
  workbenchVariant: {
    exportOptions: ['image'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Markdown から画像への変換 — よくある質問',
      description:
        'スクリーンショットを手動で撮る運用から Markdown 画像ジェネレーターに切り替える前に、よく寄せられる疑問をまとめました。',
      faqItems: markdownToImageFaqItemsJa,
    },
  ],
};
