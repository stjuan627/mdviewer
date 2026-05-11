import { useEffect, useMemo, useReducer, useRef } from 'react';
import { DEFAULT_VIEW, RENDER_DEBOUNCE_MS, SHARE_SCHEMA_VERSION } from '@/lib/constants';
import { renderResult } from '@/lib/renderer';
import { normalizeMarkdown } from '@/lib/schemas';
import { viewRegistry } from '@/lib/views';

type Notice = {
  tone: 'neutral' | 'success' | 'error';
  message: string;
} | null;

type State = {
  markdown: string;
  draftMarkdown: string;
  view: MarkdownBoxView;
  notice: Notice;
  isSharing: boolean;
  shareUrl: string | null;
  copyTick: number;
  source: string | null;
  payloadDropped: boolean;
};

type Action =
  | { type: 'edit'; markdown: string }
  | { type: 'commit' }
  | { type: 'switch-view'; view: MarkdownBoxView }
  | { type: 'set-notice'; notice: Notice }
  | { type: 'share-start' }
  | { type: 'share-success'; shareUrl: string }
  | { type: 'share-error'; message: string }
  | { type: 'copy-success' }
  | { type: 'copy-error'; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'edit':
      return { ...state, draftMarkdown: action.markdown };
    case 'commit': {
      const nextMarkdown = normalizeMarkdown(state.draftMarkdown) || state.markdown;
      return { ...state, markdown: nextMarkdown };
    }
    case 'switch-view':
      return {
        ...state,
        view: action.view,
        shareUrl: null,
        notice: { tone: 'neutral', message: `${viewRegistry[action.view].label} view 已更新。` },
      };
    case 'set-notice':
      return { ...state, notice: action.notice };
    case 'share-start':
      return { ...state, isSharing: true, notice: { tone: 'neutral', message: '正在创建分享链接…' } };
    case 'share-success':
      return {
        ...state,
        isSharing: false,
        shareUrl: action.shareUrl,
        notice: { tone: 'success', message: '分享链接已创建。' },
      };
    case 'share-error':
      return { ...state, isSharing: false, notice: { tone: 'error', message: action.message } };
    case 'copy-success':
      return {
        ...state,
        copyTick: state.copyTick + 1,
        notice: { tone: 'success', message: '已复制净化后的 HTML。' },
      };
    case 'copy-error':
      return { ...state, notice: { tone: 'error', message: action.message } };
    default:
      return state;
  }
}

export type WorkbenchProps = {
  initialMarkdown: string;
  initialView: MarkdownBoxView;
  source: string | null;
  payloadDropped: boolean;
};

export function Workbench({ initialMarkdown, initialView, source, payloadDropped }: WorkbenchProps) {
  const [state, dispatch] = useReducer(reducer, {
    markdown: initialMarkdown,
    draftMarkdown: initialMarkdown,
    view: initialView,
    notice: payloadDropped ? { tone: 'neutral', message: 'URL 里的内容过长或非法，已回落到默认示例。' } : null,
    isSharing: false,
    shareUrl: null,
    copyTick: 0,
    source,
    payloadDropped,
  });
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      dispatch({ type: 'commit' });
    }, RENDER_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [state.draftMarkdown]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', state.view);
    window.history.replaceState({}, '', url);
  }, [state.view]);

  const rendered = useMemo(() => renderResult(state.markdown, state.view), [state.markdown, state.view]);
  const currentView = viewRegistry[state.view] ?? viewRegistry[DEFAULT_VIEW];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(rendered.html);
      dispatch({ type: 'copy-success' });
    } catch {
      dispatch({ type: 'copy-error', message: '复制失败，请检查浏览器剪贴板权限。' });
    }
  }

  async function handleShare() {
    if (state.isSharing) {
      return;
    }

    dispatch({ type: 'share-start' });

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          markdown: state.markdown,
          view: state.view,
        }),
      });

      const data: { shareUrl?: string; error?: string } = await response.json();

      if (!response.ok || typeof data.shareUrl !== 'string') {
        throw new Error(data.error || '创建分享失败');
      }

      dispatch({ type: 'share-success', shareUrl: data.shareUrl });
    } catch (error) {
      const message = error instanceof Error ? error.message : '创建分享失败';
      dispatch({ type: 'share-error', message });
    }
  }

  return (
    <div className="page">
      <div className="shell">
        <section className="hero-card">
          <span className="hero-kicker">Markdown publishing workbench</span>
          <h1 className="hero-title">同一份 Markdown，直接切成更适合发布的结果。</h1>
          <p className="hero-copy">
            static-first 的工作台壳子，里面是一整个 React island。你看到的是预览结果，不是编辑器炫技。
          </p>
          <div className="status-row">
            <span>当前视图：{currentView.label}</span>
            <span>rendererVersion：{rendered.rendererVersion}</span>
            <span>schemaVersion：{SHARE_SCHEMA_VERSION}</span>
            {state.source ? <span>source：{state.source}</span> : null}
          </div>
        </section>

        <div className="grid-two" style={{ marginTop: '20px' }}>
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2 style={{ margin: 0 }}>Markdown input</h2>
                <p className="muted" style={{ marginBottom: 0 }}>
                  粘贴原始 Markdown，然后切 Article / Release 看结果差异。
                </p>
              </div>
              <div className="tabs" aria-label="View switcher">
                {Object.values(viewRegistry).map((view) => (
                  <button
                    key={view.id}
                    type="button"
                    data-testid={`view-tab-${view.id}`}
                    className={`tab ${state.view === view.id ? 'is-active' : ''}`}
                    onClick={() => dispatch({ type: 'switch-view', view: view.id })}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              aria-label="Markdown input"
              className="editor"
              data-testid="markdown-input"
              value={state.draftMarkdown}
              onChange={(event) => dispatch({ type: 'edit', markdown: event.target.value })}
            />

            <div className="inline-actions">
              <button type="button" className="button-primary" data-testid="copy-html" onClick={handleCopy}>
                复制净化后 HTML
              </button>
              <button
                type="button"
                className="button-secondary"
                data-testid="create-share"
                disabled={state.isSharing}
                onClick={handleShare}
              >
                {state.isSharing ? '创建中…' : '创建分享链接'}
              </button>
              {state.shareUrl ? (
                <a className="button button-secondary" data-testid="open-share" href={state.shareUrl} target="_blank" rel="noreferrer">
                  打开分享页
                </a>
              ) : null}
            </div>

            {state.notice ? (
              <div
                className="notice"
                data-testid="workbench-notice"
                data-tone={state.notice.tone === 'neutral' ? undefined : state.notice.tone}
              >
                {state.notice.message}
              </div>
            ) : null}
          </section>

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2 style={{ margin: 0 }}>{currentView.label} preview</h2>
                <p className="muted" style={{ marginBottom: 0 }}>{currentView.description}</p>
              </div>
            </div>
            <div className="preview-frame" data-testid="preview-frame" dangerouslySetInnerHTML={{ __html: rendered.html }} />
          </section>
        </div>
      </div>
    </div>
  );
}
