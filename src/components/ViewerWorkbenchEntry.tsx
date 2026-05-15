import { useState, type ComponentProps } from 'react';
import { navigate } from 'astro:transitions/client';
import { stageWorkbenchNavigationPayload } from '@/lib/workbench-navigation-store';

type ViewerWorkbenchEntryProps = {
  initialMarkdown: string;
};

type ViewerFormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];

export function ViewerWorkbenchEntry({ initialMarkdown }: ViewerWorkbenchEntryProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  async function handleSubmit(event: ViewerFormSubmitEvent) {
    event.preventDefault();

    stageWorkbenchNavigationPayload({
      markdown,
      source: 'markdown-viewer',
    });

    await navigate('/?source=markdown-viewer');
  }

  return (
    <form className="viewer-form" onSubmit={handleSubmit}>
      <div className="panel-header">
        <div>
          <h2 style={{ margin: 0 }}>Paste Markdown</h2>
          <p className="muted" style={{ marginBottom: 0 }}>
            长内容会直接保存在当前会话的客户端状态里，再顺滑带入 Workbench。
          </p>
        </div>
      </div>
      <textarea
        className="editor"
        aria-label="Markdown viewer input"
        name="payload"
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
      />
      <div className="hero-actions">
        <button className="button-primary" type="submit">
          进入 Workbench
        </button>
        <a className="button button-secondary" href="/">
          直接看默认示例
        </a>
      </div>
    </form>
  );
}
