import { useEffect, useMemo, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { useStore } from '@nanostores/react';
import { RENDER_DEBOUNCE_MS } from '@/lib/constants';
import {
  $draftMarkdown,
  $markdown,
  $rendered,
  $shareState,
  $view,
  commitDraftMarkdown,
  completeShare,
  failShare,
  hydrateWorkbench,
  startShare,
  switchWorkbenchView,
  updateDraftMarkdown,
} from '@/lib/workbench-store';
import { viewRegistry } from '@/lib/views';

const primaryPage = { label: 'Markdown Workbench', href: '/workbench', active: true, icon: 'workbench' };

const converterPages = [
  { label: 'Markdown to HTML', meta: 'Soon', href: null, icon: 'html' },
  { label: 'Markdown to Image', meta: 'Soon', href: null, icon: 'image' },
  { label: 'TOC Generator', meta: 'Soon', href: null, icon: 'toc' },
];

const resourcePages = [
  { label: 'Guides', meta: 'Library', href: null, icon: 'guides' },
  { label: 'Examples', meta: 'Library', href: null, icon: 'examples' },
  { label: "What's New", meta: 'Updates', href: null, icon: 'updates' },
];

const supportPages = [
  { label: 'About markdown.box', meta: 'About', href: null, icon: 'about' },
  { label: 'Roadmap', meta: 'Plan', href: null, icon: 'roadmap' },
  { label: 'Help & Feedback', meta: 'Support', href: null, icon: 'help' },
];

const topActions = [
  { label: 'Theme', kind: 'icon-sun' },
  { label: 'Shortcuts', kind: 'icon-command' },
  { label: 'Export', kind: 'button-export' },
];

const editorToolbarIcons = [
  'bold',
  'italic',
  'strike',
  'code',
  'link',
  'image',
  'bullets',
  'numbers',
  'quote',
  'snippet',
  'more',
];

export type WorkbenchProps = {
  initialMarkdown: string;
  initialView: MarkdownBoxView;
  source: string | null;
  payloadDropped: boolean;
};

export function Workbench({ initialMarkdown, initialView, source, payloadDropped }: WorkbenchProps) {
  const draftMarkdown = useStore($draftMarkdown);
  const view = useStore($view);
  const shareState = useStore($shareState);
  const rendered = useStore($rendered);
  const editorScrollRef = useRef<HTMLElement | null>(null);
  const previewScrollRef = useRef<HTMLDivElement | null>(null);
  const syncingPaneRef = useRef<'editor' | 'preview' | null>(null);

  const extensions = useMemo(
    () => [markdown({ base: markdownLanguage, codeLanguages: languages })],
    []
  );

  useEffect(() => {
    hydrateWorkbench({ markdown: initialMarkdown, view: initialView });
  }, [initialMarkdown, initialView]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      commitDraftMarkdown();
    }, RENDER_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [draftMarkdown]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    window.history.replaceState({}, '', url);
  }, [view]);

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

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(rendered.html);
    } catch {
      // Keep the toolbar visually quiet; clipboard failures can be surfaced later.
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
          view,
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
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-top">
          <a className="brand" href="/">
            <span className="brand-mark">M</span>
            <span className="brand-copy">
              <strong>markdown.box</strong>
              <small>tools for writers & builders</small>
            </span>
          </a>

          <div className="sidebar-nav">
            <a href={primaryPage.href} className="nav-item is-active">
              <span className={`nav-icon nav-icon-${primaryPage.icon}`} aria-hidden="true" />
              <span className="nav-copy nav-copy-single">
                <span>{primaryPage.label}</span>
              </span>
            </a>

            <div className="sidebar-group">
              <div className="sidebar-label">Converters</div>
              <div className="nav-list">
                {converterPages.map((item) => (
                  <div key={item.label} className="nav-item nav-item-placeholder" aria-disabled="true">
                    <span className={`nav-icon nav-icon-${item.icon}`} aria-hidden="true" />
                    <span className="nav-copy nav-copy-single">
                      <span>{item.label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-group">
              <div className="sidebar-label">Resources</div>
              <div className="nav-list">
                {resourcePages.map((item) => (
                  <div key={item.label} className="nav-item nav-item-placeholder" aria-disabled="true">
                    <span className={`nav-icon nav-icon-${item.icon}`} aria-hidden="true" />
                    <span className="nav-copy nav-copy-single">
                      <span>{item.label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-group sidebar-group-secondary">
              <div className="nav-list">
                {supportPages.map((item) => (
                  <div key={item.label} className="nav-item nav-item-placeholder" aria-disabled="true">
                    <span className={`nav-icon nav-icon-${item.icon}`} aria-hidden="true" />
                    <span className="nav-copy nav-copy-single">
                      <span>{item.label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar-promo">
            <span className="sidebar-promo-icon">✦</span>
            <strong>More tools, coming soon.</strong>
            <p>We&apos;re building a growing collection of markdown tools to help you write, convert, and publish with ease.</p>
            <span className="sidebar-promo-link">See Roadmap <span aria-hidden="true">→</span></span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-profile">
            <span className="sidebar-avatar">W</span>
            <span className="sidebar-profile-copy">
              <strong>Writer</strong>
              <small>Free Plan</small>
            </span>
            <span className="sidebar-profile-caret">⌄</span>
          </div>
          <button type="button" className="sidebar-collapse">← Collapse</button>
        </div>
      </aside>

      <main className="main-content">
        <div className="shell shell-workbench">
          <section className="workbench-stage">
            <div className="workbench-hero">
              <div className="workbench-hero-copy">
                <h1>Markdown Workbench</h1>
                <p>Write, preview, and perfect your Markdown. Fast, clean, and distraction-free.</p>
              </div>

              <div className="workbench-hero-actions" aria-label="Workbench actions">
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
                  <div className="tabs workbench-tabs" aria-label="View switcher">
                    {Object.values(viewRegistry).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        data-testid={`view-tab-${item.id}`}
                        className={`tab workbench-tab ${view === item.id ? 'is-active' : ''}`}
                        onClick={() => switchWorkbenchView(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="workbench-divider" aria-hidden="true" />
                  <div className="workbench-editor-actions" aria-label="Editor formatting toolbar">
                    {editorToolbarIcons.map((icon) => (
                      <button key={icon} type="button" className={`toolbar-icon-button toolbar-icon-${icon}`} aria-label={`${icon} placeholder`}>
                        <span className="toolbar-glyph" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="workbench-toolbar-right">
                  <button type="button" className="button-toolbar button-toolbar-copy" data-testid="copy-html" onClick={handleCopy}>
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
                <span>当前视图：{viewRegistry[view].label}</span>
                {source ? <span>入口来源：{source}</span> : null}
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
                    data-testid="preview-frame"
                    dangerouslySetInnerHTML={{ __html: rendered.html }}
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
