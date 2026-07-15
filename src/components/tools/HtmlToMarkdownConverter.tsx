import { useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { navigate } from 'astro:transitions/client';
import { ArrowRight, Clipboard, Download, FileUp, RotateCcw, ShieldCheck, Trash2 } from 'lucide-react';
import { convertHtmlToMarkdown, type ConversionWarning } from '@/lib/html-to-markdown';
import { renderResult } from '@/lib/renderer';
import {
  HTML_TO_MARKDOWN_LIMITS,
  normalizeMarkdown,
  renderRequestSchema,
} from '@/lib/schemas';
import { DEFAULT_THEME_ID } from '@/lib/themes';
import { stageWorkbenchNavigationPayload } from '@/lib/workbench-navigation-store';

type OutputTab = 'markdown' | 'preview';
type ConversionStatus = 'idle' | 'converting' | 'success' | 'error';

const EXAMPLE_HTML = `<article>
  <h1>Ship clearer documentation</h1>
  <p>Move <strong>useful structure</strong> from HTML into clean Markdown.</p>
  <ul>
    <li><input type="checkbox" checked disabled> Keep headings and lists</li>
    <li><input type="checkbox" disabled> Review the result</li>
  </ul>
  <pre><code class="language-js">const format = "markdown";
console.log(format);</code></pre>
  <table>
    <thead><tr><th>Source</th><th>Result</th></tr></thead>
    <tbody><tr><td>HTML</td><td>Clean GFM</td></tr></tbody>
  </table>
  <p>Continue in <a href="https://mdviewer.net">MD Viewer</a>.</p>
</article>`;

function errorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'issues' in error) {
    const issues = (error as { issues?: Array<{ message?: string }> }).issues;
    if (issues?.[0]?.message) return issues[0].message;
  }
  return error instanceof Error ? error.message : 'Conversion failed. Check the HTML and try again.';
}

export function HtmlToMarkdownConverter() {
  const [draftHtml, setDraftHtml] = useState(EXAMPLE_HTML);
  const [markdown, setMarkdown] = useState('');
  const [warnings, setWarnings] = useState<ConversionWarning[]>([]);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [message, setMessage] = useState('Ready to convert. Your HTML stays in this browser tab.');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OutputTab>('markdown');
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const previewHtml = useMemo(() => (markdown ? renderResult(markdown).html : ''), [markdown]);

  function convert() {
    setStatus('converting');
    setError(null);
    try {
      const result = convertHtmlToMarkdown(draftHtml);
      setMarkdown(result.markdown);
      setWarnings(result.warnings);
      setStatus('success');
      setMessage(`Converted to ${result.markdown.length.toLocaleString()} Markdown characters${result.warnings.length ? ` with ${result.warnings.length} warning${result.warnings.length === 1 ? '' : 's'}` : ''}.`);
    } catch (conversionError) {
      setStatus('error');
      setError(errorMessage(conversionError));
      setMessage(markdown ? 'Conversion failed. The previous result is still shown.' : 'Conversion failed.');
    }
  }

  async function openFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!/\.html?$/i.test(file.name)) {
      setError('Choose a .html or .htm file.');
      setStatus('error');
      return;
    }
    if (file.size > HTML_TO_MARKDOWN_LIMITS.maxFileBytes) {
      setError('HTML files can be up to 200 KB.');
      setStatus('error');
      return;
    }
    const text = await file.text();
    if (text.length > HTML_TO_MARKDOWN_LIMITS.maxInputLength) {
      setError('HTML input can contain up to 200,000 characters.');
      setStatus('error');
      return;
    }
    setDraftHtml(text);
    setError(null);
    setStatus('idle');
    setMessage(`Loaded ${file.name}. Select Convert to Markdown when ready.`);
  }

  async function copyMarkdown() {
    try {
      renderRequestSchema.parse({ markdown });
      await navigator.clipboard.writeText(markdown);
      setError(null);
      setMessage('Markdown copied to your clipboard.');
    } catch (copyError) {
      setError(markdown ? 'Clipboard access was denied. Select the Markdown source and copy it manually.' : errorMessage(copyError));
    }
  }

  function downloadMarkdown() {
    try {
      renderRequestSchema.parse({ markdown });
      const url = URL.createObjectURL(new Blob([`${markdown}\n`], { type: 'text/markdown;charset=utf-8' }));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'converted-markdown.md';
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage('Downloaded converted-markdown.md.');
    } catch (downloadError) {
      setError(errorMessage(downloadError));
    }
  }

  async function openInViewer() {
    try {
      if (status === 'error') {
        throw new Error('Convert the current HTML successfully before opening it in Markdown Viewer.');
      }
      const validated = renderRequestSchema.parse({ markdown: normalizeMarkdown(markdown) });
      stageWorkbenchNavigationPayload({ markdown: validated.markdown, source: 'html-to-markdown', themeId: DEFAULT_THEME_ID });
      await navigate('/');
    } catch (handoffError) {
      setError(errorMessage(handoffError));
    }
  }

  function clear() {
    setDraftHtml('');
    setMarkdown('');
    setWarnings([]);
    setStatus('idle');
    setError(null);
    setMessage('Cleared. Paste HTML or open a local file.');
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowRight' ? (index + 1) % 2 : (index + 1) % 2;
    setActiveTab(nextIndex === 0 ? 'markdown' : 'preview');
    tabsRef.current[nextIndex]?.focus();
  }

  return (
    <section className="html-converter" aria-label="HTML to Markdown converter">
      <div className="html-converter-toolbar" aria-label="Conversion actions">
        <div className="html-converter-toolbar-group">
          <button type="button" className="tool-button" onClick={() => { setDraftHtml(EXAMPLE_HTML); setError(null); setMessage('Example loaded. Select Convert to Markdown.'); }}>
            <RotateCcw aria-hidden="true" /> Load example
          </button>
          <button type="button" className="tool-button" onClick={() => fileRef.current?.click()}>
            <FileUp aria-hidden="true" /> Open HTML file
          </button>
          <input ref={fileRef} className="sr-only" type="file" accept=".html,.htm,text/html" onChange={openFile} aria-label="Open a local HTML file" data-testid="html-file-input" />
          <button type="button" className="tool-button tool-button-danger" onClick={clear}>
            <Trash2 aria-hidden="true" /> Clear
          </button>
        </div>
        <button type="button" className="tool-button tool-button-primary html-convert-button" onClick={convert} disabled={status === 'converting'} data-testid="convert-html">
          {status === 'converting' ? 'Converting…' : 'Convert to Markdown'} <ArrowRight aria-hidden="true" />
        </button>
      </div>

      <div className="html-converter-privacy"><ShieldCheck aria-hidden="true" /><span>Conversion runs in your browser. Your HTML is not uploaded.</span></div>

      {warnings.length ? (
        <div className="conversion-warnings" role="status" aria-label="Conversion warnings" data-testid="conversion-warnings">
          <strong>Conversion notes</strong>
          <ul>{warnings.map((warning) => <li key={warning.code}>{warning.message}</li>)}</ul>
        </div>
      ) : null}

      <div className="html-converter-layout">
        <div className="html-converter-pane html-input-pane">
          <div className="table-pane-header">
            <div><h2>HTML input</h2><p>{draftHtml.length.toLocaleString()} / {HTML_TO_MARKDOWN_LIMITS.maxInputLength.toLocaleString()} characters</p></div>
            <span className="privacy-note">HTML</span>
          </div>
          <label className="sr-only" htmlFor="html-converter-input">HTML input</label>
          <textarea id="html-converter-input" className="html-source-input" value={draftHtml} onChange={(event) => setDraftHtml(event.target.value)} placeholder="Paste HTML here…" spellCheck={false} data-testid="html-input" />
        </div>

        <div className="html-converter-pane html-output-pane">
          <div className="table-output-header">
            <div className="tool-tabs" role="tablist" aria-label="Conversion output">
              {(['markdown', 'preview'] as const).map((tab, index) => (
                <button key={tab} ref={(button) => { tabsRef.current[index] = button; }} type="button" role="tab" aria-selected={activeTab === tab} aria-controls={`html-${tab}-panel`} tabIndex={activeTab === tab ? 0 : -1} className={activeTab === tab ? 'is-active' : ''} onClick={() => setActiveTab(tab)} onKeyDown={(event) => handleTabKey(event, index)}>
                  {tab === 'markdown' ? 'Markdown' : 'Preview'}
                </button>
              ))}
            </div>
          </div>

          <div id="html-markdown-panel" className="table-output-panel" role="tabpanel" hidden={activeTab !== 'markdown'}>
            {markdown ? <textarea className="markdown-source-output" value={markdown} readOnly aria-label="Converted Markdown source" data-testid="markdown-output" /> : <div className="table-output-empty">Convert HTML to see clean Markdown here.</div>}
          </div>
          <div id="html-preview-panel" className="table-output-panel" role="tabpanel" hidden={activeTab !== 'preview'}>
            {previewHtml ? <div className="table-preview-panel"><div className="preview-content table-preview" dangerouslySetInnerHTML={{ __html: previewHtml }} data-testid="html-conversion-preview" /></div> : <div className="table-output-empty">Convert HTML to preview the rendered result.</div>}
          </div>

          {markdown ? (
            <div className="table-output-actions">
              <button type="button" className="tool-button tool-button-primary" onClick={copyMarkdown} data-testid="copy-markdown"><Clipboard aria-hidden="true" /> Copy Markdown</button>
              <button type="button" className="tool-button" onClick={downloadMarkdown}><Download aria-hidden="true" /> Download .md</button>
              <button type="button" className="tool-button" onClick={openInViewer} data-testid="open-in-viewer">Open in Markdown Viewer <ArrowRight aria-hidden="true" /></button>
            </div>
          ) : null}
        </div>
      </div>

      <div className={`table-generator-status${error ? ' is-error' : ''}`} role={error ? 'alert' : 'status'} aria-live="polite" data-testid="html-converter-status">
        {error ? <><strong>{error}</strong>{markdown ? <span> Conversion failed. The previous result is still shown.</span> : null}</> : message}
      </div>
    </section>
  );
}
