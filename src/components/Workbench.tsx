import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { useStore } from '@nanostores/react';
import { Check, ChevronDown, Copy, Download, LoaderCircle, SwatchBook, Trash2, Upload } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RENDER_DEBOUNCE_MS } from '@/lib/constants';
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

const DEFAULT_EXPORT_OPTIONS: WorkbenchExportOption[] = ['html', 'pdf', 'image'];

export function Workbench({
  initialMarkdown,
  payloadDropped,
  initialThemeId,
  title,
  description,
  exportOptions = DEFAULT_EXPORT_OPTIONS,
}: WorkbenchProps) {
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

  function handleClear() {
    if (!window.confirm('Clear the current Markdown content?')) {
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

    form.appendChild(markdownInput);
    form.appendChild(themeInput);
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
    setToolbarNotice('Preparing your PDF...');

    try {
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });
      submitPdfExportForm('/api/pdf-quick');

      setQuickActionPdfState('downloaded');
      setToolbarNotice('PDF requested.');
    } catch (error) {
      console.error(error);
      setQuickActionPdfState('error');
      setToolbarNotice('PDF export failed.');
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

    const previewElement = previewScrollRef.current;

    if (!previewElement) {
      setExportImageState('error');
      setToolbarNotice('PNG export failed.');
      return;
    }

    setExportImageState('downloading');
    setToolbarNotice('Preparing PNG...');

    try {
      const result = await exportElementToImage(previewElement);
      setExportImageState('downloaded');
      setToolbarNotice(
        result.fileCount > 1 ? `PNG exported as ${result.fileCount} files.` : 'PNG downloaded.'
      );
    } catch (error) {
      console.error(error);
      setExportImageState('error');
      setToolbarNotice('PNG export failed.');
    } finally {
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
  const exportButtonLabel =
    quickActionPdfState === 'downloading'
      ? 'Exporting PDF'
      : exportImageState === 'downloading'
        ? 'Exporting PNG'
        : 'Export';

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
                      {quickActionPdfState === 'downloading' ? 'PDF (Exporting...)' : 'PDF'}
                    </DropdownMenuItem>
                  ) : null}
                  {exportOptions.includes('image') ? (
                    <DropdownMenuItem
                      data-testid="quick-action-image"
                      disabled={exportImageState === 'downloading'}
                      onClick={handleExportImage}
                    >
                      {exportImageState === 'downloading' ? 'PNG (Exporting...)' : 'PNG'}
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
                <button type="button" className="toolbar-icon-button" aria-label="Clear content" title="Clear content" onClick={handleClear}>
                  <Trash2 className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  className="toolbar-icon-button"
                  aria-label={copyMarkdownState === 'copied' ? 'Copied' : 'Copy Markdown'}
                  title={copyMarkdownState === 'copied' ? 'Copied' : 'Copy Markdown'}
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
                  aria-label="Upload Markdown"
                  title="Upload Markdown"
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
              </div>
            </div>

            <div className="workbench-toolbar-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={!isHydrated}>
                  <button type="button" className="toolbar-theme-trigger" aria-label="Theme selector">
                    <SwatchBook className="toolbar-theme-icon" aria-hidden="true" size={14} strokeWidth={1.9} />
                    <span className="toolbar-theme-value">
                      {themeOptions.find((option) => option.id === themeId)?.label}
                    </span>
                    <ChevronDown className="toolbar-theme-caret" aria-hidden="true" size={14} strokeWidth={1.9} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="toolbar-theme-menu" align="end">
                  <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={themeId} onValueChange={(value) => setThemeId(value as ThemeId)}>
                    {themeOptions.map((option) => (
                      <DropdownMenuRadioItem key={option.id} value={option.id} className="toolbar-theme-menu-item">
                        <span className="toolbar-theme-menu-copy">
                          <span className="toolbar-theme-menu-title">{option.label}</span>
                          <span className="toolbar-theme-menu-summary">{option.summary}</span>
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
                aria-label={copyHtmlState === 'copied' ? 'Copied HTML' : 'Copy HTML'}
                title={copyHtmlState === 'copied' ? 'Copied HTML' : 'Copy HTML'}
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
                aria-label={downloadHtmlState === 'downloaded' ? 'Downloaded HTML' : 'Download HTML'}
                title={downloadHtmlState === 'downloaded' ? 'Downloaded HTML' : 'Download HTML'}
                onClick={handleDownloadHtml}
              >
                {downloadHtmlState === 'downloaded' ? (
                  <Check className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.9} />
                ) : (
                  <Download className="toolbar-icon-svg" aria-hidden="true" size={16} strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>

          <div className="toolbar-notice" data-testid="workbench-notice" role="status">
            {toolbarNotice ? <span>{toolbarNotice}</span> : null}
            {payloadDropped ? <span>已回落到默认示例</span> : null}
          </div>

          <div className="workbench-body">
            <section className="workbench-pane workbench-pane-editor">
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
                  placeholder="Write your markdown here..."
                  theme="light"
                  onCreateEditor={(editorView) => {
                    editorScrollRef.current = editorView.scrollDOM;
                  }}
                  onChange={updateDraftMarkdown}
                />
              </div>
            </section>

            <section className="workbench-pane workbench-pane-preview">
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
        <div className="pdf-export-overlay" role="status" aria-live="polite" aria-label="Preparing PDF export">
          <div className="pdf-export-overlay-card">
            <div className="pdf-export-overlay-spinner" aria-hidden="true">
              <LoaderCircle className="pdf-export-overlay-spinner-icon" size={18} strokeWidth={2} />
            </div>
            <div className="pdf-export-overlay-copy">
              <strong>Preparing PDF</strong>
              <span>Sending HTML to Cloudflare Quick Actions...</span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
