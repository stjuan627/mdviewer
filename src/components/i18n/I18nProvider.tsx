import { createContext, useContext, type ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';

const dictionaries = {
  en: {
    'locale.label': 'Language',
    'locale.selector': 'Select language',
    'locale.en': 'English',
    'locale.zh-cn': '简体中文',
    'sidebar.brandHome': 'MD Viewer home',
    'sidebar.tools': 'Tools',
    'sidebar.markdownToHtml': 'Markdown to HTML',
    'sidebar.markdownToPdf': 'Markdown to PDF',
    'sidebar.markdownToImage': 'Markdown to Image',
    'sidebar.help': 'Help & Feedback',
    'sidebar.theme.light': 'Light mode',
    'sidebar.theme.dark': 'Dark mode',
    'sidebar.theme.switchToLight': 'Switch to light mode',
    'sidebar.theme.switchToDark': 'Switch to dark mode',
    'sidebar.collapse.expand': 'Expand sidebar',
    'sidebar.collapse.collapse': 'Collapse sidebar',
    'sidebar.mobile.open': 'Open navigation menu',
    'sidebar.mobile.menu': 'Menu',
    'sidebar.mobile.title': 'Navigation',
    'sidebar.mobile.description': 'Open sidebar navigation for MD Viewer tools.',
    'workbench.actions': 'Workbench actions',
    'workbench.export': 'Export',
    'workbench.exportingPdf': 'Exporting PDF',
    'workbench.exportingPng': 'Exporting PNG',
    'workbench.menu.pdf': 'PDF',
    'workbench.menu.pdfExporting': 'PDF (Exporting...)',
    'workbench.menu.png': 'PNG',
    'workbench.menu.pngExporting': 'PNG (Exporting...)',
    'workbench.toolbar.clear': 'Clear content',
    'workbench.toolbar.copyMarkdown': 'Copy Markdown',
    'workbench.toolbar.copied': 'Copied',
    'workbench.toolbar.upload': 'Upload Markdown',
    'workbench.toolbar.maximizeEditor': 'Maximize editor',
    'workbench.toolbar.maximizePreview': 'Maximize preview',
    'workbench.toolbar.restoreSplit': 'Restore split view',
    'workbench.theme.select': 'Select Theme',
    'workbench.theme.trigger': 'Theme selector',
    'workbench.copyHtml': 'Copy HTML',
    'workbench.copiedHtml': 'Copied HTML',
    'workbench.downloadHtml': 'Download HTML',
    'workbench.downloadedHtml': 'Downloaded HTML',
    'workbench.notice.fallback': 'Fell back to the default sample',
    'workbench.notice.preparingPdf': 'Preparing your PDF...',
    'workbench.notice.pdfRequested': 'PDF requested.',
    'workbench.notice.pdfFailed': 'PDF export failed.',
    'workbench.notice.preparingPng': 'Preparing PNG...',
    'workbench.notice.pngDownloaded': 'PNG downloaded.',
    'workbench.notice.pngFailed': 'PNG export failed.',
    'workbench.notice.pngMulti': 'PNG exported as {count} files.',
    'workbench.placeholder': 'Write your markdown here...',
    'workbench.confirmClear': 'Clear the current Markdown content?',
    'workbench.overlay.preparingPdf': 'Preparing PDF',
    'workbench.overlay.sendingPdf': 'Sending HTML to Cloudflare Quick Actions...',
    'theme.paper.label': 'Paper',
    'theme.paper.summary': 'Warm editorial',
    'theme.blueprint.label': 'Blueprint',
    'theme.blueprint.summary': 'Crisp technical',
    'theme.nocturne.label': 'Nocturne',
    'theme.nocturne.summary': 'Dark reading',
    'print.title': 'MD Viewer Print Preview',
    'print.description': 'Printable Markdown preview.',
    'print.preparing': 'Preparing print preview...',
    'print.unavailable': 'Print preview is unavailable. Return to the workbench and try again.',
    'print.openFailed': 'Print dialog could not be opened automatically. Use your browser print command.',
    'print.restoreFailed': 'Print preview payload could not be restored.',
    'api.pdf.invalidPayload': 'Invalid PDF export payload.',
    'api.pdf.notConfigured': 'Quick Action PDF is not configured.',
    'api.pdf.failed': 'Quick Action PDF export failed.',
  },
  'zh-cn': {
    'locale.label': '语言',
    'locale.selector': '选择语言',
    'locale.en': 'English',
    'locale.zh-cn': '简体中文',
    'sidebar.brandHome': 'MD Viewer 首页',
    'sidebar.tools': '工具',
    'sidebar.markdownToHtml': 'Markdown 转 HTML',
    'sidebar.markdownToPdf': 'Markdown 转 PDF',
    'sidebar.markdownToImage': 'Markdown 转图片',
    'sidebar.help': '帮助与反馈',
    'sidebar.theme.light': '浅色模式',
    'sidebar.theme.dark': '深色模式',
    'sidebar.theme.switchToLight': '切换到浅色模式',
    'sidebar.theme.switchToDark': '切换到深色模式',
    'sidebar.collapse.expand': '展开侧边栏',
    'sidebar.collapse.collapse': '收起侧边栏',
    'sidebar.mobile.open': '打开导航菜单',
    'sidebar.mobile.menu': '菜单',
    'sidebar.mobile.title': '导航',
    'sidebar.mobile.description': '打开 MD Viewer 工具导航。',
    'workbench.actions': '工作台操作',
    'workbench.export': '导出',
    'workbench.exportingPdf': '正在导出 PDF',
    'workbench.exportingPng': '正在导出 PNG',
    'workbench.menu.pdf': 'PDF',
    'workbench.menu.pdfExporting': 'PDF（导出中...）',
    'workbench.menu.png': 'PNG',
    'workbench.menu.pngExporting': 'PNG（导出中...）',
    'workbench.toolbar.clear': '清空内容',
    'workbench.toolbar.copyMarkdown': '复制 Markdown',
    'workbench.toolbar.copied': '已复制',
    'workbench.toolbar.upload': '上传 Markdown',
    'workbench.toolbar.maximizeEditor': '最大化编辑区',
    'workbench.toolbar.maximizePreview': '最大化预览区',
    'workbench.toolbar.restoreSplit': '恢复分栏视图',
    'workbench.theme.select': '选择主题',
    'workbench.theme.trigger': '主题选择器',
    'workbench.copyHtml': '复制 HTML',
    'workbench.copiedHtml': '已复制 HTML',
    'workbench.downloadHtml': '下载 HTML',
    'workbench.downloadedHtml': '已下载 HTML',
    'workbench.notice.fallback': '已回落到默认示例',
    'workbench.notice.preparingPdf': '正在准备 PDF...',
    'workbench.notice.pdfRequested': '已提交 PDF 导出请求。',
    'workbench.notice.pdfFailed': 'PDF 导出失败。',
    'workbench.notice.preparingPng': '正在准备 PNG...',
    'workbench.notice.pngDownloaded': 'PNG 已下载。',
    'workbench.notice.pngFailed': 'PNG 导出失败。',
    'workbench.notice.pngMulti': 'PNG 已导出为 {count} 个文件。',
    'workbench.placeholder': '在这里输入你的 Markdown...',
    'workbench.confirmClear': '要清空当前 Markdown 内容吗？',
    'workbench.overlay.preparingPdf': '正在准备 PDF',
    'workbench.overlay.sendingPdf': '正在把 HTML 发送到 Cloudflare Quick Actions...',
    'theme.paper.label': 'Paper',
    'theme.paper.summary': '温暖排版',
    'theme.blueprint.label': 'Blueprint',
    'theme.blueprint.summary': '清晰技术风',
    'theme.nocturne.label': 'Nocturne',
    'theme.nocturne.summary': '深色阅读',
    'print.title': 'MD Viewer 打印预览',
    'print.description': '可打印的 Markdown 预览。',
    'print.preparing': '正在准备打印预览...',
    'print.unavailable': '打印预览暂不可用，请返回工作台后重试。',
    'print.openFailed': '无法自动打开打印对话框，请使用浏览器的打印命令。',
    'print.restoreFailed': '无法恢复打印预览数据。',
    'api.pdf.invalidPayload': 'PDF 导出请求无效。',
    'api.pdf.notConfigured': 'Quick Action PDF 尚未配置。',
    'api.pdf.failed': 'Quick Action PDF 导出失败。',
  },
  ja: {
    'locale.label': '言語',
    'locale.selector': '言語を選択',
    'locale.en': 'English',
    'locale.zh-cn': '简体中文',
    'locale.ja': '日本語',
    'sidebar.brandHome': 'MD Viewer ホーム',
    'sidebar.tools': 'ツール',
    'sidebar.markdownToHtml': 'Markdown から HTML',
    'sidebar.markdownToPdf': 'Markdown から PDF',
    'sidebar.markdownToImage': 'Markdown から画像',
    'sidebar.help': 'ヘルプとフィードバック',
    'sidebar.theme.light': 'ライトモード',
    'sidebar.theme.dark': 'ダークモード',
    'sidebar.theme.switchToLight': 'ライトモードに切り替え',
    'sidebar.theme.switchToDark': 'ダークモードに切り替え',
    'sidebar.collapse.expand': 'サイドバーを展開',
    'sidebar.collapse.collapse': 'サイドバーを折りたたむ',
    'sidebar.mobile.open': 'ナビゲーションメニューを開く',
    'sidebar.mobile.menu': 'メニュー',
    'sidebar.mobile.title': 'ナビゲーション',
    'sidebar.mobile.description': 'MD Viewer のツールナビゲーションを開きます。',
    'workbench.actions': 'ワークベンチ操作',
    'workbench.export': 'エクスポート',
    'workbench.exportingPdf': 'PDF をエクスポート中',
    'workbench.exportingPng': 'PNG をエクスポート中',
    'workbench.menu.pdf': 'PDF',
    'workbench.menu.pdfExporting': 'PDF（エクスポート中...）',
    'workbench.menu.png': 'PNG',
    'workbench.menu.pngExporting': 'PNG（エクスポート中...）',
    'workbench.toolbar.clear': '内容をクリア',
    'workbench.toolbar.copyMarkdown': 'Markdown をコピー',
    'workbench.toolbar.copied': 'コピーしました',
    'workbench.toolbar.upload': 'Markdown をアップロード',
    'workbench.toolbar.maximizeEditor': 'エディタを最大化',
    'workbench.toolbar.maximizePreview': 'プレビューを最大化',
    'workbench.toolbar.restoreSplit': '分割表示に戻す',
    'workbench.theme.select': 'テーマを選択',
    'workbench.theme.trigger': 'テーマセレクター',
    'workbench.copyHtml': 'HTML をコピー',
    'workbench.copiedHtml': 'HTML をコピーしました',
    'workbench.downloadHtml': 'HTML をダウンロード',
    'workbench.downloadedHtml': 'HTML をダウンロードしました',
    'workbench.notice.fallback': 'デフォルトサンプルに切り替えました',
    'workbench.notice.preparingPdf': 'PDF を準備しています...',
    'workbench.notice.pdfRequested': 'PDF エクスポートを開始しました。',
    'workbench.notice.pdfFailed': 'PDF のエクスポートに失敗しました。',
    'workbench.notice.preparingPng': 'PNG を準備しています...',
    'workbench.notice.pngDownloaded': 'PNG をダウンロードしました。',
    'workbench.notice.pngFailed': 'PNG のエクスポートに失敗しました。',
    'workbench.notice.pngMulti': 'PNG を {count} ファイルとして出力しました。',
    'workbench.placeholder': 'ここに Markdown を入力してください...',
    'workbench.confirmClear': '現在の Markdown をクリアしますか？',
    'workbench.overlay.preparingPdf': 'PDF を準備中',
    'workbench.overlay.sendingPdf': 'HTML を Cloudflare Quick Actions に送信しています...',
    'theme.paper.label': 'Paper',
    'theme.paper.summary': '暖かいエディトリアル',
    'theme.blueprint.label': 'Blueprint',
    'theme.blueprint.summary': '鮮明なテクニカル',
    'theme.nocturne.label': 'Nocturne',
    'theme.nocturne.summary': 'ダークリーディング',
    'print.title': 'MD Viewer 印刷プレビュー',
    'print.description': '印刷用 Markdown プレビュー。',
    'print.preparing': '印刷プレビューを準備しています...',
    'print.unavailable': '印刷プレビューを利用できません。ワークベンチに戻って再試行してください。',
    'print.openFailed': '印刷ダイアログを自動で開けませんでした。ブラウザの印刷コマンドを使用してください。',
    'print.restoreFailed': '印刷プレビューのデータを復元できませんでした。',
    'api.pdf.invalidPayload': 'PDF エクスポートのリクエストが無効です。',
    'api.pdf.notConfigured': 'Quick Action PDF はまだ設定されていません。',
    'api.pdf.failed': 'Quick Action PDF のエクスポートに失敗しました。',
  },
} as const;

export type TranslationKey = keyof (typeof dictionaries)['en'];

type I18nValue = {
  locale: Locale;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) {
    return template;
  }

  return Object.entries(params).reduce(
    (message, [key, value]) => message.replaceAll(`{${key}}`, String(value)),
    template
  );
}

export function getTranslation(locale: Locale, key: TranslationKey, params?: Record<string, string | number>) {
  return interpolate(dictionaries[locale][key], params);
}

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider
      value={{
        locale,
        t: (key, params) => getTranslation(locale, key, params),
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(I18nContext);

  if (!value) {
    throw new Error('useI18n must be used within I18nProvider.');
  }

  return value;
}
