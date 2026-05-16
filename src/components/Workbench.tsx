import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { useStore } from '@nanostores/react';
import { Check, ChevronDown, Copy, Trash2, Upload } from 'lucide-react';
import { WorkbenchSidebar } from '@/components/WorkbenchSidebar';
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
import { renderResult } from '@/lib/renderer';
import { normalizeMarkdown } from '@/lib/schemas';
import { themeOptions, type ThemeId } from '@/lib/themes';

const topActions = [
  { label: 'Shortcuts', kind: 'icon-command' },
  { label: 'Export', kind: 'button-export' },
];

export type WorkbenchProps = {
  initialMarkdown: string;
  payloadDropped: boolean;
  initialThemeId: ThemeId;
};

export function Workbench({ initialMarkdown, payloadDropped, initialThemeId }: WorkbenchProps) {
  const draftMarkdown = useStore($draftMarkdown);
  const committedMarkdown = useStore($markdown);
  const shareState = useStore($shareState);
  const rendered = useStore($rendered);
  const [themeId, setThemeId] = useState<ThemeId>(initialThemeId);
  const [isHydrated, setIsHydrated] = useState(false);
  const [copyMarkdownState, setCopyMarkdownState] = useState<'idle' | 'copied'>('idle');
  const editorScrollRef = useRef<HTMLElement | null>(null);
  const previewScrollRef = useRef<HTMLDivElement | null>(null);
  const syncingPaneRef = useRef<'editor' | 'preview' | null>(null);
  const hydratedInitialMarkdownRef = useRef<string | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const copyMarkdownResetRef = useRef<number | null>(null);
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
    await copyTextToClipboard(rendered.html);
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

  async function handleShare() {
    if (shareState.isSharing) {
      return;
    }

    startShare();

    try {
      commitDraftMarkdown();
      const markdown = $markdown.get();

      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          markdown,
          themeId,
        }),
      });

      const data: { shareUrl?: string; error?: string } = await response.json();

      if (!response.ok || typeof data.shareUrl !== 'string') {
        throw new Error(data.error || '创建分享失败，请重试。');
      }

      completeShare(data.shareUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : '创建分享失败，请重试。';
      failShare(message);
    }
  }

  return (
    <div className="app-container" data-workbench-hydrated={isHydrated ? 'true' : 'false'}>
      <WorkbenchSidebar />

      <main className="main-content">
        <div className="shell shell-workbench">
          <section className="workbench-stage">
            <div className="workbench-hero">
              <div className="workbench-hero-copy">
                <h1>Markdown Workbench</h1>
                <p>Write, preview, and perfect your Markdown. Fast, clean, and distraction-free.</p>
              </div>

              <div className="workbench-hero-actions" aria-label="Workbench actions">
                <label className="theme-switcher" aria-label="Theme selector">
                  <span className="theme-switcher-label">Theme</span>
                  <div className="theme-switcher-select-wrap">
                    <select
                      className="theme-switcher-select"
                      disabled={!isHydrated}
                      value={themeId}
                      onChange={(event) => setThemeId(event.target.value as ThemeId)}
                    >
                      {themeOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="theme-switcher-caret" aria-hidden="true" size={16} strokeWidth={1.8} />
                  </div>
                  <span className="theme-switcher-summary">
                    {themeOptions.find((option) => option.id === themeId)?.summary}
                  </span>
                </label>
                {topActions.map((action) =>
                  action.kind === 'button-export' ? (
                    <button key={action.label} type="button" className="hero-action hero-action-export">
                      <span>{action.label}</span>
                      <span className="hero-action-caret" aria-hidden="true">⌄</span>
                    </button>
                  ) : (
                    <button key={action.label} type="button" className="hero-action hero-action-icon" aria-label={action.label}>
                      <span className={`hero-icon ${action.kind}`} aria-hidden="true" />
                    </button>
                  )
                )}
              </div>

              <div className="workbench-hero-art" aria-hidden="true">
                <img src="/workbench-hero-art.svg" alt="" />
              </div>
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
                  <button type="button" className="button-toolbar button-toolbar-copy" data-testid="copy-html" onClick={handleCopyHtml}>
                    Copy HTML
                  </button>
                  <button
                    type="button"
                    className="button-toolbar button-toolbar-primary"
                    data-testid="create-share"
                    disabled={shareState.isSharing}
                    onClick={handleShare}
                  >
                    {shareState.isSharing ? 'Sharing…' : 'Share'}
                  </button>
                  {shareState.shareUrl ? (
                    <a className="button-toolbar" data-testid="open-share" href={shareState.shareUrl} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="toolbar-notice" data-testid="workbench-notice" role="status">
                {payloadDropped ? <span>已回落到默认示例</span> : null}
                {shareState.shareUrl ? <span>分享链接已创建</span> : null}
                {shareState.error ? <span>{shareState.error}</span> : null}
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
          </section>
        </div>
      </main>
    </div>
  );
}
