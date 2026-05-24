import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { useStore } from '@nanostores/react';
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  LoaderCircle,
  Maximize2,
  Minimize2,
  SwatchBook,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/components/i18n/I18nProvider';
import { RENDER_DEBOUNCE_MS } from '@/lib/constants';
import type { Locale } from '@/lib/i18n';
import {
  $draftMarkdown,
  $markdown,
  $rendered,
  $shareState,
  commitDraftMarkdown,
  completeShare,
  failShare,
  hydrateWorkbench,
  replaceMarkdown,
  startShare,
  updateDraftMarkdown,
} from '@/lib/workbench-store';
import { exportElementToImage } from '@/lib/export-image';
import { renderResult } from '@/lib/renderer';
import { normalizeMarkdown } from '@/lib/schemas';
import type { WorkbenchExportOption } from '@/lib/landing-pages';
import { themeOptions, type ThemeId } from '@/lib/themes';

export type WorkbenchProps = {
  locale: Locale;
  initialMarkdown: string;
  payloadDropped: boolean;
  initialThemeId: ThemeId;
  title?: string;
  description?: string;
  exportOptions?: WorkbenchExportOption[];
};

type ShareResponsePayload = {
  shareUrl?: string;
  error?: string;
};

type WorkbenchPaneMode = 'split' | 'editor' | 'preview';

const DEFAULT_EXPORT_OPTIONS: WorkbenchExportOption[] = ['html', 'pdf', 'image'];

export function Workbench({
  locale,
  initialMarkdown,
  payloadDropped,
  initialThemeId,
  title,
  description,
  exportOptions = DEFAULT_EXPORT_OPTIONS,
}: WorkbenchProps) {
  const { t } = useI18n();
  const draftMarkdown = useStore($draftMarkdown);
  const committedMarkdown = useStore($markdown);
  const rendered = useStore($rendered);
  const shareState = useStore($shareState);
  const [themeId, setThemeId] = useState<ThemeId>(initialThemeId);
  const [isHydrated, setIsHydrated] = useState(false);
  const [copyMarkdownState, setCopyMarkdownState] = useState<'idle' | 'copied'>('idle');
  const [copyHtmlState, setCopyHtmlState] = useState<'idle' | 'copied'>('idle');
  const [downloadHtmlState, setDownloadHtmlState] = useState<'idle' | 'downloaded'>('idle');
  const [exportImageState, setExportImageState] = useState<'idle' | 'downloading' | 'downloaded' | 'error'>('idle');
  const [quickActionPdfState, setQuickActionPdfState] = useState<'idle' | 'downloading' | 'downloaded' | 'error'>('idle');
  const [toolbarNotice, setToolbarNotice] = useState<string | null>(null);
  const [paneMode, setPaneMode] = useState<WorkbenchPaneMode>('split');
  const editorScrollRef = useRef<HTMLElement | null>(null);
  const previewScrollRef = useRef<HTMLDivElement | null>(null);
  const syncingPaneRef = useRef<'editor' | 'preview' | null>(null);
  const hydratedInitialMarkdownRef = useRef<string | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const copyMarkdownResetRef = useRef<number | null>(null);
  const copyHtmlResetRef = useRef<number | null>(null);
  const downloadHtmlResetRef = useRef<number | null>(null);
  const exportImageResetRef = useRef<number | null>(null);
  const quickActionPdfResetRef = useRef<number | null>(null);
  const initialRendered = useMemo(() => renderResult(initialMarkdown), [initialMarkdown]);

  if (committedMarkdown === initialMarkdown) {
    hydratedInitialMarkdownRef.current = initialMarkdown;
  }

  const previewHtml =
    hydratedInitialMarkdownRef.current === initialMarkdown ? rendered.html : initialRendered.html;

  const extensions = useMemo(
    () => [markdown({ base: markdownLanguage, codeLanguages: languages })],
    []
  );

  useEffect(() => {
    hydrateWorkbench({ markdown: initialMarkdown });
    setThemeId(initialThemeId);
  }, [initialMarkdown, initialThemeId]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    return () => {
      if (copyMarkdownResetRef.current !== null) {
        window.clearTimeout(copyMarkdownResetRef.current);
      }
      if (copyHtmlResetRef.current !== null) {
        window.clearTimeout(copyHtmlResetRef.current);
      }
      if (downloadHtmlResetRef.current !== null) {
        window.clearTimeout(downloadHtmlResetRef.current);
      }
      if (exportImageResetRef.current !== null) {
        window.clearTimeout(exportImageResetRef.current);
      }
      if (quickActionPdfResetRef.current !== null) {
        window.clearTimeout(quickActionPdfResetRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      commitDraftMarkdown();
    }, RENDER_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [draftMarkdown]);

  useEffect(() => {
    const editorScroller = editorScrollRef.current;
    const previewScroller = previewScrollRef.current;

    if (!editorScroller || !previewScroller) {
      return;
    }

    const syncScroll = (source: HTMLElement, target: HTMLElement, pane: 'editor' | 'preview') => {
      if (syncingPaneRef.current && syncingPaneRef.current !== pane) {
        return;
      }

      const sourceRange = source.scrollHeight - source.clientHeight;
      const targetRange = target.scrollHeight - target.clientHeight;
      const nextRatio = sourceRange > 0 ? source.scrollTop / sourceRange : 0;

      syncingPaneRef.current = pane;
      target.scrollTop = targetRange > 0 ? nextRatio * targetRange : 0;

      window.requestAnimationFrame(() => {
        if (syncingPaneRef.current === pane) {
          syncingPaneRef.current = null;
        }
      });
    };

    const handleEditorScroll = () => syncScroll(editorScroller, previewScroller, 'editor');
    const handlePreviewScroll = () => syncScroll(previewScroller, editorScroller, 'preview');

    editorScroller.addEventListener('scroll', handleEditorScroll, { passive: true });
    previewScroller.addEventListener('scroll', handlePreviewScroll, { passive: true });

    return () => {
      editorScroller.removeEventListener('scroll', handleEditorScroll);
      previewScroller.removeEventListener('scroll', handlePreviewScroll);
    };
  }, [rendered.html]);

  async function copyTextToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      try {
        return document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  async function waitForNextFrame(frameCount = 1) {
    for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });
    }
  }

  function togglePaneMode(targetPane: Exclude<WorkbenchPaneMode, 'split'>) {
    setPaneMode((currentMode) => (currentMode === targetPane ? 'split' : targetPane));
  }

  function handleClear() {
    if (!window.confirm(t('workbench.confirmClear'))) {
      return;
    }

    replaceMarkdown('');
  }

  async function handleCopyMarkdown() {
    const markdownToCopy = normalizeMarkdown(draftMarkdown);
    const didCopy = await copyTextToClipboard(markdownToCopy);

    if (!didCopy) {
      return;
    }

    setCopyMarkdownState('copied');

    if (copyMarkdownResetRef.current !== null) {
      window.clearTimeout(copyMarkdownResetRef.current);
    }

    copyMarkdownResetRef.current = window.setTimeout(() => {
      setCopyMarkdownState('idle');
      copyMarkdownResetRef.current = null;
    }, 1500);
  }

  async function handleCopyHtml() {
    const didCopy = await copyTextToClipboard(rendered.html);

    if (!didCopy) {
      return;
    }

    setCopyHtmlState('copied');

    if (copyHtmlResetRef.current !== null) {
      window.clearTimeout(copyHtmlResetRef.current);
    }

    copyHtmlResetRef.current = window.setTimeout(() => {
      setCopyHtmlState('idle');
      copyHtmlResetRef.current = null;
    }, 1500);
  }

  async function handleShare() {
    if (shareState.isSharing) {
      return;
    }

    const markdownToShare = normalizeMarkdown(draftMarkdown);

    startShare();

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          markdown: markdownToShare,
          themeId,
        }),
      });

      const payload = (await response.json().catch(() => null)) as ShareResponsePayload | null;

      if (!response.ok || !payload?.shareUrl) {
        failShare(payload?.error ?? 'Failed to create share link.');
        return;
      }

      completeShare(payload.shareUrl);
      await copyTextToClipboard(payload.shareUrl);
    } catch {
      failShare('Failed to create share link.');
    }
  }

  function handleDownloadHtml() {
    const blob = new Blob([rendered.html], { type: 'text/html;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = 'mdviewer-export.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);

    setDownloadHtmlState('downloaded');

    if (downloadHtmlResetRef.current !== null) {
      window.clearTimeout(downloadHtmlResetRef.current);
    }

    downloadHtmlResetRef.current = window.setTimeout(() => {
      setDownloadHtmlState('idle');
      downloadHtmlResetRef.current = null;
    }, 1500);
  }

  function submitPdfExportForm(action: string) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;
    form.style.display = 'none';

    const markdownInput = document.createElement('input');
    markdownInput.type = 'hidden';
    markdownInput.name = 'markdown';
    markdownInput.value = normalizeMarkdown(committedMarkdown);

    const themeInput = document.createElement('input');
    themeInput.type = 'hidden';
    themeInput.name = 'themeId';
    themeInput.value = themeId;

    const localeInput = document.createElement('input');
    localeInput.type = 'hidden';
    localeInput.name = 'locale';
    localeInput.value = locale;

    form.appendChild(markdownInput);
    form.appendChild(themeInput);
    form.appendChild(localeInput);
    document.body.appendChild(form);

    form.submit();
    window.setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
  }

  async function handleQuickActionPdf() {
    if (quickActionPdfState === 'downloading') {
      return;
    }

    if (quickActionPdfResetRef.current !== null) {
      window.clearTimeout(quickActionPdfResetRef.current);
      quickActionPdfResetRef.current = null;
    }

    setQuickActionPdfState('downloading');
    setToolbarNotice(t('workbench.notice.preparingPdf'));

    try {
      await waitForNextFrame();
      submitPdfExportForm('/api/pdf-quick');

      setQuickActionPdfState('downloaded');
      setToolbarNotice(t('workbench.notice.pdfRequested'));
    } catch (error) {
      console.error(error);
      setQuickActionPdfState('error');
      setToolbarNotice(t('workbench.notice.pdfFailed'));
    } finally {
      quickActionPdfResetRef.current = window.setTimeout(() => {
        setQuickActionPdfState('idle');
        setToolbarNotice(null);
        quickActionPdfResetRef.current = null;
      }, 2400);
    }
  }

  async function handleExportImage() {
    if (exportImageState === 'downloading') {
      return;
    }

    if (exportImageResetRef.current !== null) {
      window.clearTimeout(exportImageResetRef.current);
      exportImageResetRef.current = null;
    }

    setExportImageState('downloading');
    setToolbarNotice(t('workbench.notice.preparingPng'));

    const restoreEditorPane = paneMode === 'editor';

    try {
      if (restoreEditorPane) {
        setPaneMode('preview');
        await waitForNextFrame(2);
      }

      const previewElement = previewScrollRef.current;

      if (!previewElement) {
        throw new Error('Preview element is unavailable.');
      }

      const result = await exportElementToImage(previewElement);
      setExportImageState('downloaded');
      setToolbarNotice(
        result.fileCount > 1
          ? t('workbench.notice.pngMulti', { count: result.fileCount })
          : t('workbench.notice.pngDownloaded')
      );
    } catch (error) {
      console.error(error);
      setExportImageState('error');
      setToolbarNotice(t('workbench.notice.pngFailed'));
    } finally {
      if (restoreEditorPane) {
        setPaneMode('editor');
      }

      exportImageResetRef.current = window.setTimeout(() => {
        setExportImageState('idle');
        setToolbarNotice(null);
        exportImageResetRef.current = null;
      }, 2600);
    }
  }

  function handleOpenUpload() {
    uploadInputRef.current?.click();
  }

  async function handleUploadMarkdown(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      replaceMarkdown(content);
    } finally {
      event.target.value = '';
    }
  }

  const hasExportMenu = exportOptions.length > 0;
  const isExporting = quickActionPdfState === 'downloading' || exportImageState === 'downloading';
  const isEditorMaximized = paneMode === 'editor';
  const isPreviewMaximized = paneMode === 'preview';
  const exportButtonLabel =
    quickActionPdfState === 'downloading'
      ? t('workbench.exportingPdf')
      : exportImageState === 'downloading'
        ? t('workbench.exportingPng')
        : t('workbench.export');

  return (
    <section className="shell shell-workbench" data-workbench-hydrated={isHydrated ? 'true' : 'false'}>
      <div className="workbench-stage">
        <div className="workbench-hero">
          <div className="workbench-hero-copy">
            <h1 className="workbench-hero-title">{title}</h1>
            <p>{description}</p>
          </div>

          {hasExportMenu ? (
            <div className="workbench-hero-actions" aria-label="Workbench actions">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="hero-action hero-action-export"
                    data-testid="export-menu-trigger"
                    aria-label={exportButtonLabel}
                    aria-busy={isExporting}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <LoaderCircle className="hero-action-spinner" aria-hidden="true" size={14} strokeWidth={2} />
                    ) : null}
                    <span>{exportButtonLabel}</span>
                    <ChevronDown
                      className="hero-action-caret-icon"
                      aria-hidden="true"
                      size={14}
                      strokeWidth={1.9}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="hero-action-menu">
                  {exportOptions.includes('html') ? (
                    <DropdownMenuItem onClick={handleDownloadHtml}>HTML</DropdownMenuItem>
                  ) : null}
                  {exportOptions.includes('pdf') ? (
                    <DropdownMenuItem
                      data-testid="quick-action-pdf"
                      disabled={quickActionPdfState === 'downloading'}
                      onClick={handleQuickActionPdf}
                    >
                      {quickActionPdfState === 'downloading' ? t('workbench.menu.pdfExporting') : t('workbench.menu.pdf')}
                    </DropdownMenuItem>
                  ) : null}
                  {exportOptions.includes('image') ? (
                    <DropdownMenuItem
                      data-testid="quick-action-image"
                      disabled={exportImageState === 'downloading'}
                      onClick={handleExportImage}
                    >
                      {exportImageState === 'downloading' ? t('workbench.menu.pngExporting') : t('workbench.menu.png')}
                    </DropdownMenuItem>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null}

        </div>

        <section className="workbench-surface">
          <div className="workbench-toolbar">
            <div className="workbench-toolbar-left">
              <div className="workbench-editor-actions" aria-label="Editor actions toolbar">
                <button type="button" className="toolbar-icon-button" aria-label={t('workbench.toolbar.clear')} title={t('workbench.toolbar.clear')} onClick={handleClear}>
                  <Trash2 className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  className="toolbar-icon-button"
                  aria-label={copyMarkdownState === 'copied' ? t('workbench.toolbar.copied') : t('workbench.toolbar.copyMarkdown')}
                  title={copyMarkdownState === 'copied' ? t('workbench.toolbar.copied') : t('workbench.toolbar.copyMarkdown')}
                  onClick={handleCopyMarkdown}
                >
                  {copyMarkdownState === 'copied' ? (
                    <Check className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.9} />
                  ) : (
                    <Copy className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                  )}
                </button>
                <button
                  type="button"
                  className="toolbar-icon-button"
                  aria-label={t('workbench.toolbar.upload')}
                  title={t('workbench.toolbar.upload')}
                  onClick={handleOpenUpload}
                >
                  <Upload className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                </button>
                <input
                  ref={uploadInputRef}
                  type="file"
                  accept=".md,.markdown,.txt,text/markdown,text/plain"
                  className="toolbar-file-input"
                  tabIndex={-1}
                  aria-hidden="true"
                  onChange={handleUploadMarkdown}
                />
                <button
                  type="button"
                  className="toolbar-icon-button"
                  aria-label={isEditorMaximized ? t('workbench.toolbar.restoreSplit') : t('workbench.toolbar.maximizeEditor')}
                  aria-pressed={isEditorMaximized}
                  title={isEditorMaximized ? t('workbench.toolbar.restoreSplit') : t('workbench.toolbar.maximizeEditor')}
                  onClick={() => togglePaneMode('editor')}
                >
                  {isEditorMaximized ? (
                    <Minimize2 className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                  ) : (
                    <Maximize2 className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                  )}
                </button>
              </div>
            </div>

            <div className="workbench-toolbar-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={!isHydrated}>
                  <button type="button" className="toolbar-theme-trigger" aria-label={t('workbench.theme.trigger')} data-testid="theme-trigger">
                    <SwatchBook className="toolbar-theme-icon" aria-hidden="true" size={14} strokeWidth={1.9} />
                    <span className="toolbar-theme-value">
                      {themeOptions.find((option) => option.id === themeId)?.label[locale]}
                    </span>
                    <ChevronDown className="toolbar-theme-caret" aria-hidden="true" size={14} strokeWidth={1.9} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="toolbar-theme-menu" align="end">
                  <DropdownMenuLabel>{t('workbench.theme.select')}</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={themeId} onValueChange={(value) => setThemeId(value as ThemeId)}>
                    {themeOptions.map((option) => (
                      <DropdownMenuRadioItem key={option.id} value={option.id} className="toolbar-theme-menu-item" data-testid={`theme-option-${option.id}`}>
                        <span className="toolbar-theme-menu-copy">
                          <span className="toolbar-theme-menu-title">{option.label[locale]}</span>
                          <span className="toolbar-theme-menu-summary">{option.summary[locale]}</span>
                        </span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                type="button"
                className="toolbar-icon-button"
                data-testid="copy-html"
                aria-label={copyHtmlState === 'copied' ? t('workbench.copiedHtml') : t('workbench.copyHtml')}
                title={copyHtmlState === 'copied' ? t('workbench.copiedHtml') : t('workbench.copyHtml')}
                onClick={handleCopyHtml}
              >
                {copyHtmlState === 'copied' ? (
                  <Check className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.9} />
                ) : (
                  <Copy className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                )}
              </button>
              <button
                type="button"
                className="toolbar-icon-button"
                data-testid="download-html"
                aria-label={downloadHtmlState === 'downloaded' ? t('workbench.downloadedHtml') : t('workbench.downloadHtml')}
                title={downloadHtmlState === 'downloaded' ? t('workbench.downloadedHtml') : t('workbench.downloadHtml')}
                onClick={handleDownloadHtml}
              >
                {downloadHtmlState === 'downloaded' ? (
                  <Check className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.9} />
                ) : (
                  <Download className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                )}
              </button>
              <button
                type="button"
                className="toolbar-icon-button"
                aria-label={isPreviewMaximized ? t('workbench.toolbar.restoreSplit') : t('workbench.toolbar.maximizePreview')}
                aria-pressed={isPreviewMaximized}
                title={isPreviewMaximized ? t('workbench.toolbar.restoreSplit') : t('workbench.toolbar.maximizePreview')}
                onClick={() => togglePaneMode('preview')}
              >
                {isPreviewMaximized ? (
                  <Minimize2 className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                ) : (
                  <Maximize2 className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>

          <div className="toolbar-notice" data-testid="workbench-notice" role="status">
            {toolbarNotice ? <span>{toolbarNotice}</span> : null}
            {payloadDropped ? <span>{t('workbench.notice.fallback')}</span> : null}
          </div>

          <div
            className={[
              'workbench-body',
              isEditorMaximized ? 'is-editor-maximized' : '',
              isPreviewMaximized ? 'is-preview-maximized' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            data-pane-mode={paneMode}
          >
            <section
              className={[
                'workbench-pane',
                'workbench-pane-editor',
                isPreviewMaximized ? 'is-hidden' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              id="workbench-editor-pane"
              aria-hidden={isPreviewMaximized}
            >
              <div className="workbench-editor-shell" data-testid="markdown-input" aria-label="Markdown input">
                <CodeMirror
                  value={draftMarkdown}
                  height="100%"
                  minHeight="100%"
                  basicSetup={{
                    lineNumbers: false,
                    highlightActiveLineGutter: false,
                    foldGutter: false,
                    dropCursor: false,
                  }}
                  className="workbench-codemirror"
                  extensions={extensions}
                  indentWithTab
                  placeholder={t('workbench.placeholder')}
                  theme="light"
                  onCreateEditor={(editorView) => {
                    editorScrollRef.current = editorView.scrollDOM;
                  }}
                  onChange={updateDraftMarkdown}
                />
              </div>
            </section>

            <section
              className={[
                'workbench-pane',
                'workbench-pane-preview',
                isEditorMaximized ? 'is-hidden' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              id="workbench-preview-pane"
              aria-hidden={isEditorMaximized}
            >
              <div
                ref={previewScrollRef}
                className="preview-frame prose"
                data-theme={themeId}
                data-testid="preview-frame"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </section>
          </div>
        </section>
      </div>

      {quickActionPdfState === 'downloading' ? (
        <div className="pdf-export-overlay" role="status" aria-live="polite" aria-label={t('workbench.overlay.preparingPdf')}>
          <div className="pdf-export-overlay-card">
            <div className="pdf-export-overlay-spinner" aria-hidden="true">
              <LoaderCircle className="pdf-export-overlay-spinner-icon" size={18} strokeWidth={2} />
            </div>
            <div className="pdf-export-overlay-copy">
              <strong>{t('workbench.overlay.preparingPdf')}</strong>
              <span>{t('workbench.overlay.sendingPdf')}</span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
