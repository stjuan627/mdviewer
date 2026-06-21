import { markdownToHtmlInitialMarkdownJa } from '@/lib/landing-pages/content/ja/markdown-to-html';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToHtmlTitle = 'MarkdownをHTMLに変換 — 無料のオンラインMD/HTML変換ツール';
const markdownToHtmlDescription =
  '完全無料のMarkdownからHTMLへのオンライン変換ツール。マークダウン（.md）を貼り付けるかアップロードするだけで、ブラウザ上でレンダリング結果をプレビューし、セマンティックでクリーンなHTMLをコピーできます。インストールや会員登録は一切不要。WordPress等のCMSやメール配信ツール、Webアプリにそのまま利用できます。';

const markdownToHtmlFaqItems: LandingSectionFaqItem[] = [
  {
    question: 'このMarkdown/HTML変換ツールは無料で使えますか？',
    answer:
      'はい。当サイトのMarkdownからHTMLへの変換ツールは完全無料でご利用いただけます。会員登録やアカウント作成、利用回数の制限もありません。Markdownを貼り付けてプレビューを確認し、そのままHTMLをコピーするだけですぐに使えます。',
  },
  {
    question: '出力されるHTMLは、セマンティック（意味論的）でクリーンなものですか？',
    answer:
      'はい。見出しは`<h1>`～`<h6>`、リストは`<ul>`や`<ol>`、表（テーブル）は適切な`<table>`タグ、コードは`<pre><code>`として出力されます。特定のフレームワークに依存するクラスやトラッキング用の属性は含まれないため、CMSやメールのテンプレート、独自のWebアプリなどにそのまま貼り付けても安全です。',
  },
  {
    question: '変換したHTMLをNotion、Webflow、WordPressなどに貼り付けられますか？',
    answer:
      'はい、可能です。出力されたHTMLは標準的なタグを使用しているため、一般的なリッチテキストエディターやCMSが問題なく読み込めます。Notionにはそのまま貼り付けられ、WebflowやWordPressでは「カスタムHTML」や「コード」ブロックで利用できます。クラス属性を削除してしまうような環境であっても、基礎となるタグ構造は維持されます。',
  },
  {
    question: 'メールマガジンやニュースレターの配信にこのHTMLを使えますか？',
    answer:
      'このツールが出力するセマンティックなHTMLは、Mailchimp、Substackなどのメール配信ツール用のクリーンなベースとして最適です。ただし、多くのメールクライアントは依然としてインラインCSSでの装飾を必要とするため、本番環境のメールで利用する際は、変換後のHTMLにCSSをインライン化するなどの調整を行ってください。',
  },
  {
    question: 'コードブロックのシンタックスハイライト（構文のハイライト）は維持されますか？',
    answer:
      'はい、維持されます。（例: ```` ```ts ````）のように言語指定されたコードブロックは、出力されたHTMLのクラスにも言語のヒントが残るため、再解析することなく、ご自身のCSSテーマを使ってシンタックスハイライトを適用できます。',
  },
  {
    question: 'テキストの貼り付けではなく、`.md`ファイルをアップロードできますか？',
    answer:
      'はい。エディターエリアは`.md`、`.markdown`、およびプレーンテキストファイルのアップロードに対応しています。ファイルをドロップしてHTMLのプレビューを確認し、出力をコピーするかファイルとしてダウンロードしてください。',
  },
  {
    question: '変換時にMarkdownの内容がサーバーに送信されますか？',
    answer:
      'いいえ。MarkdownからHTMLへの変換はすべてお使いのブラウザ（ローカル環境）内で完結します。ご自身で意図的に「共有リンク」を作成しない限り、入力したデータがお使いの端末外に送信されることはありません。',
  },
  {
    question: 'Pandocや静的サイトジェネレーターとはどう違いますか？',
    answer:
      'Pandocはコマンドライン(CLI)ベースのバッチ処理向けツールです。また、AstroやHugoなどの静的サイトジェネレーターは、全体の設定やビルド環境を構築する必要があります。当ツールは「ブラウザを開いてMarkdownを貼り付け、すぐにHTMLを持ち帰る」という単発のタスクに特化しており、インストールや環境構築の必要がありません。',
  },
  {
    question: 'ここでHTMLからMarkdownに逆変換することはできますか？',
    answer:
      'いいえ、当ツールはMarkdownからHTMLへの「一方向」の変換専用です。逆変換を行う場合は専用のツールやライブラリをご利用ください。私たちのワークフローでは、Markdownを「信頼できる情報源（ソース・オブ・トゥルース）」として管理することを推奨しています。',
  },
];

export const markdownToHtmlLandingPageJa: LandingPageConfig = {
  locale: 'ja',
  slug: 'markdown-to-html',
  path: '/markdown-to-html',
  prerender: true,
  title: markdownToHtmlTitle,
  description: markdownToHtmlDescription,
  heroTitle: 'MarkdownからHTMLへ変換',
  initialMarkdown: markdownToHtmlInitialMarkdownJa,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToHtmlTitle,
        description: markdownToHtmlDescription,
        path: '/markdown-to-html',
      },
      [
        'MarkdownからHTMLへ変換',
        'MD HTML 変換',
        'オンライン Markdown 変換',
        '無料 Markdown HTML コンバーター',
        '.mdからHTMLへのエクスポート',
        'MarkdownからHTMLをコピー',
        'レンダリングされたMarkdownをHTMLでダウンロード',
        'READMEからHTMLへ変換',
        'GitHub MarkdownからHTMLへ',
        'GFMからHTMLへのコンバーター',
        'セマンティックなHTMLへの変換',
        'クリーンなMarkdown HTML出力',
        'Notionに貼り付けるためのMarkdown変換',
        'Webflow用のMarkdown変換',
        'WordPress用Markdownコンバーター',
        'ブラウザベースのMarkdown変換',
        'インストール不要のMarkdownツール',
      ]
    ),
    ...buildFaqSchema(markdownToHtmlFaqItems),
  ],
  workbenchVariant: {
    exportOptions: ['html'],
  },
  sections: [
    {
      id: 'destinations',
      kicker: '貼り付け方と活用例',
      title: '変換したHTMLの主要なツール・CMSへの貼り付け方',
      description:
        '当ツールで出力されるHTMLは汎用的かつセマンティックですが、各プラットフォームによってHTMLを受け入れる場所が少しずつ異なります。代表的なツールでの利用方法をまとめました。',
      columns: 3,
      cards: [
        {
          title: 'Notion',
          description: 'Notionは貼り付けたHTMLをネイティブのブロックに自動変換します。',
          items: [
            '上部のエディターからHTMLをコピーします。',
            'Notionのページにそのままペーストすると、見出し、リスト、表、コードブロックなどがNotionのネイティブブロックとして展開されます。',
          ],
        },
        {
          title: 'Webflow',
          description: '生のHTMLには**Embed**（埋め込み）要素を使用します。',
          items: [
            'ページ内にEmbed要素をドラッグ＆ドロップします。',
            '変換したHTMLを貼り付け、既存のWebflowのCSSクラスを使ってスタイリングします。',
          ],
        },
        {
          title: 'はてなブログ / Ghost',
          description: 'HTML編集モードやHTMLカードを使用します。',
          items: [
            'HTML編集モードまたはHTML挿入用のブロックに、変換したマークアップを貼り付けます。',
            'セマンティックな構造が保たれるため、公開された記事にも正しく反映されます。',
          ],
        },
        {
          title: 'WordPress',
          description: 'Gutenbergの**カスタムHTML**ブロック、またはクラシックエディタのHTMLビューを使用します。',
          items: [
            'カスタムHTMLブロックを追加し、変換したHTMLを貼り付けます。',
            'プレビューに切り替えて、表やコードブロックが正しく表示されるか確認します。',
          ],
        },
        {
          title: 'Mailchimp / メルマガ',
          description: '多くのメルマガツールはコードブロックやHTMLブロックに貼り付けることができます。',
          items: [
            'キャンペーンエディタのCodeブロックやHTMLブロックに貼り付けます。',
            'OutlookやGmailでの表示崩れを防ぐため、さらにインラインCSSを追加して調整することをおすすめします。',
          ],
        },
        {
          title: '静的サイト・フレームワーク',
          description: 'MDXやAstro、その他フレームワークのコンポーネントとしてHTMLを活用します。',
          items: [
            '`.html`ファイルとして保存するか、コンポーネント内に直接インラインで記述します。',
            'クラス名は予測可能なシンプルな構造に保たれているため、ご自身のCSSテーマがすぐに適用されます。',
          ],
        },
      ],
    },
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'MarkdownからHTMLへの変換に関するよくある質問',
      description:
        'ブラウザベースのMarkdown/HTML変換ツールで、実際のコンテンツを扱う前に多くの人が気になる実用的な疑問にお答えします。',
      faqItems: markdownToHtmlFaqItems,
    },
  ],
};
