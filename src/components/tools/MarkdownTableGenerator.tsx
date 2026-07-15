import { useMemo, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { navigate } from 'astro:transitions/client';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowRight,
  Clipboard,
  Download,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { renderResult } from '@/lib/renderer';
import {
  DEFAULT_MARKDOWN_TABLE,
  applyPastedCells,
  generateMarkdownTable,
  parseDelimitedTable,
  type TableImportDelimiter,
} from '@/lib/markdown-table';
import {
  MARKDOWN_TABLE_LIMITS,
  markdownTableModelSchema,
  normalizeMarkdown,
  renderRequestSchema,
  type MarkdownTableAlignment,
  type MarkdownTableModel,
} from '@/lib/schemas';
import { stageWorkbenchNavigationPayload } from '@/lib/workbench-navigation-store';
import { DEFAULT_THEME_ID } from '@/lib/themes';

type OutputTab = 'markdown' | 'preview';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Try again.';
}

function cloneDefaultTable(): MarkdownTableModel {
  return {
    rows: DEFAULT_MARKDOWN_TABLE.rows.map((row) => [...row]),
    alignments: [...DEFAULT_MARKDOWN_TABLE.alignments],
  };
}

function AlignmentIcon({ alignment }: { alignment: MarkdownTableAlignment }) {
  if (alignment === 'center') return <AlignCenter aria-hidden="true" />;
  if (alignment === 'right') return <AlignRight aria-hidden="true" />;
  return <AlignLeft aria-hidden="true" />;
}

export function MarkdownTableGenerator() {
  const [model, setModel] = useState<MarkdownTableModel>(cloneDefaultTable);
  const [activeTab, setActiveTab] = useState<OutputTab>('markdown');
  const [importOpen, setImportOpen] = useState(false);
  const [importValue, setImportValue] = useState('');
  const [importDelimiter, setImportDelimiter] = useState<TableImportDelimiter>('auto');
  const [status, setStatus] = useState('Ready. Your table stays in this browser tab.');
  const [error, setError] = useState<string | null>(null);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const output = useMemo(() => {
    try {
      const markdown = generateMarkdownTable(model);
      const normalized = normalizeMarkdown(markdown);
      renderRequestSchema.parse({ markdown: normalized });
      return { markdown: normalized, html: renderResult(normalized).html, error: null };
    } catch (generationError) {
      return { markdown: '', html: '', error: getErrorMessage(generationError) };
    }
  }, [model]);

  const hasUserContent = model.rows.some((row) => row.some((cell) => cell.trim().length > 0));

  function updateModel(nextModel: MarkdownTableModel, message = 'Table updated.') {
    const parsed = markdownTableModelSchema.safeParse(nextModel);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'The table is invalid.');
      return;
    }

    setModel(parsed.data);
    setError(null);
    setStatus(message);
  }

  function updateCell(rowIndex: number, columnIndex: number, value: string) {
    const rows = model.rows.map((row) => [...row]);
    rows[rowIndex][columnIndex] = value;
    updateModel({ ...model, rows });
  }

  function addRow() {
    if (model.rows.length >= MARKDOWN_TABLE_LIMITS.maxRows) {
      setError(`A table can contain up to ${MARKDOWN_TABLE_LIMITS.maxRows} rows.`);
      return;
    }

    updateModel(
      { ...model, rows: [...model.rows, Array.from({ length: model.alignments.length }, () => '')] },
      'Row added.'
    );
  }

  function removeRow(rowIndex: number) {
    if (model.rows.length <= 2) {
      setError('Keep at least one header row and one body row.');
      return;
    }

    updateModel({ ...model, rows: model.rows.filter((_, index) => index !== rowIndex) }, `Row ${rowIndex} removed.`);
  }

  function addColumn() {
    if (model.alignments.length >= MARKDOWN_TABLE_LIMITS.maxColumns) {
      setError(`A table can contain up to ${MARKDOWN_TABLE_LIMITS.maxColumns} columns.`);
      return;
    }

    updateModel(
      {
        rows: model.rows.map((row) => [...row, '']),
        alignments: [...model.alignments, 'left'],
      },
      'Column added.'
    );
  }

  function removeColumn(columnIndex: number) {
    if (model.alignments.length <= 1) {
      setError('Keep at least one column.');
      return;
    }

    updateModel(
      {
        rows: model.rows.map((row) => row.filter((_, index) => index !== columnIndex)),
        alignments: model.alignments.filter((_, index) => index !== columnIndex),
      },
      `Column ${columnIndex + 1} removed.`
    );
  }

  function setAlignment(columnIndex: number, alignment: MarkdownTableAlignment) {
    const alignments = [...model.alignments];
    alignments[columnIndex] = alignment;
    updateModel({ ...model, alignments }, `Column ${columnIndex + 1} aligned ${alignment}.`);
  }

  function handleCellPaste(event: ClipboardEvent<HTMLInputElement>, rowIndex: number, columnIndex: number) {
    const pastedText = event.clipboardData.getData('text/plain');
    if (!pastedText.includes('\t') && !/[\r\n]/.test(pastedText)) {
      return;
    }

    event.preventDefault();
    try {
      updateModel(applyPastedCells(model, rowIndex, columnIndex, pastedText), 'Spreadsheet cells pasted into the grid.');
    } catch (pasteError) {
      setError(getErrorMessage(pasteError));
    }
  }

  function importTable() {
    try {
      const imported = parseDelimitedTable(importValue, importDelimiter);
      if (hasUserContent && !window.confirm('Replace the current grid with the imported data?')) {
        return;
      }

      updateModel(imported, `Imported ${imported.rows.length} rows and ${imported.alignments.length} columns.`);
      setImportOpen(false);
      setImportValue('');
    } catch (importError) {
      setError(getErrorMessage(importError));
    }
  }

  async function copyMarkdown() {
    if (!output.markdown) {
      setError(output.error ?? 'There is no valid Markdown to copy.');
      return;
    }

    try {
      await navigator.clipboard.writeText(output.markdown);
      setError(null);
      setStatus('Markdown copied to your clipboard.');
    } catch {
      setError('Clipboard access was denied. Select the Markdown source and copy it manually.');
    }
  }

  function downloadMarkdown() {
    if (!output.markdown) {
      setError(output.error ?? 'There is no valid Markdown to download.');
      return;
    }

    const url = URL.createObjectURL(new Blob([`${output.markdown}\n`], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'markdown-table.md';
    link.click();
    URL.revokeObjectURL(url);
    setStatus('Downloaded markdown-table.md.');
  }

  async function openInViewer() {
    try {
      const markdown = normalizeMarkdown(output.markdown);
      renderRequestSchema.parse({ markdown });
      stageWorkbenchNavigationPayload({
        markdown,
        source: 'markdown-table-generator',
        themeId: DEFAULT_THEME_ID,
      });
      await navigate('/');
    } catch (handoffError) {
      setError(getErrorMessage(handoffError));
    }
  }

  function clearTable() {
    updateModel({ rows: [[''], ['']], alignments: ['left'] }, 'Grid cleared. Start with the header cell.');
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowRight' ? (index + 1) % 2 : (index + 1) % 2;
    const nextTab: OutputTab = nextIndex === 0 ? 'markdown' : 'preview';
    setActiveTab(nextTab);
    tabsRef.current[nextIndex]?.focus();
  }

  return (
    <section className="table-generator" aria-label="Markdown table generator">
      <div className="table-generator-toolbar" aria-label="Table actions">
        <div className="table-generator-toolbar-group">
          <button type="button" className="tool-button" onClick={() => setImportOpen((open) => !open)} aria-expanded={importOpen}>
            <Upload aria-hidden="true" />
            Import CSV / TSV
          </button>
          <button type="button" className="tool-button" onClick={addRow}>
            <Plus aria-hidden="true" />
            Add row
          </button>
          <button type="button" className="tool-button" onClick={addColumn}>
            <Plus aria-hidden="true" />
            Add column
          </button>
        </div>
        <button type="button" className="tool-button tool-button-danger" onClick={clearTable}>
          <Trash2 aria-hidden="true" />
          Clear
        </button>
      </div>

      {importOpen ? (
        <div className="table-import-panel" data-testid="table-import-panel">
          <div className="table-import-heading">
            <div>
              <h2>Import CSV or spreadsheet data</h2>
              <p>Paste comma-separated CSV or tab-separated cells. The first row becomes the header.</p>
            </div>
            <button type="button" className="icon-button" onClick={() => setImportOpen(false)} aria-label="Close import panel">
              <X aria-hidden="true" />
            </button>
          </div>
          <label className="table-import-field">
            <span>Data format</span>
            <select value={importDelimiter} onChange={(event) => setImportDelimiter(event.target.value as TableImportDelimiter)}>
              <option value="auto">Detect automatically</option>
              <option value="comma">Comma-separated CSV</option>
              <option value="tab">Tab-separated values</option>
            </select>
          </label>
          <label className="table-import-field table-import-field-wide">
            <span>CSV or TSV data</span>
            <textarea
              value={importValue}
              onChange={(event) => setImportValue(event.target.value)}
              placeholder={'Name,Status,Score\nAlpha,Ready,98'}
              rows={6}
              data-testid="table-import-input"
            />
          </label>
          <div className="table-import-actions">
            <button type="button" className="tool-button" onClick={() => setImportOpen(false)}>Cancel</button>
            <button type="button" className="tool-button tool-button-primary" onClick={importTable} data-testid="table-import-submit">
              Replace grid
            </button>
          </div>
        </div>
      ) : null}

      <div className="table-generator-layout">
        <div className="table-generator-pane table-grid-pane">
          <div className="table-pane-header">
            <div>
              <h2>Table editor</h2>
              <p>{model.rows.length - 1} body rows · {model.alignments.length} columns</p>
            </div>
            <span className="privacy-note">Local only</span>
          </div>

          <div className="table-grid-scroll" data-testid="table-grid-scroll">
            <table className="markdown-table-grid" aria-label="Editable Markdown table">
              <thead>
                <tr>
                  <th className="row-number-cell" scope="col">Row</th>
                  {model.alignments.map((alignment, columnIndex) => (
                    <th key={columnIndex} scope="col">
                      <div className="column-controls">
                        <label>
                          <span className="sr-only">Alignment for column {columnIndex + 1}</span>
                          <span className="alignment-control">
                            <AlignmentIcon alignment={alignment} />
                            <select
                              value={alignment}
                              onChange={(event) => setAlignment(columnIndex, event.target.value as MarkdownTableAlignment)}
                              aria-label={`Alignment for column ${columnIndex + 1}`}
                            >
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                            </select>
                          </span>
                        </label>
                        <button
                          type="button"
                          className="icon-button icon-button-small"
                          onClick={() => removeColumn(columnIndex)}
                          aria-label={`Remove column ${columnIndex + 1}`}
                        >
                          <X aria-hidden="true" />
                        </button>
                      </div>
                    </th>
                  ))}
                  <th className="row-action-cell" scope="col"><span className="sr-only">Row actions</span></th>
                </tr>
              </thead>
              <tbody>
                {model.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <th className="row-number-cell" scope="row">{rowIndex === 0 ? 'H' : rowIndex}</th>
                    {row.map((cell, columnIndex) => (
                      <td key={columnIndex}>
                        <input
                          value={cell}
                          onChange={(event) => updateCell(rowIndex, columnIndex, event.target.value)}
                          onPaste={(event) => handleCellPaste(event, rowIndex, columnIndex)}
                          aria-label={`${rowIndex === 0 ? 'Header' : `Row ${rowIndex}`}, column ${columnIndex + 1}`}
                          maxLength={MARKDOWN_TABLE_LIMITS.maxCellLength}
                          data-testid={`table-cell-${rowIndex}-${columnIndex}`}
                        />
                      </td>
                    ))}
                    <td className="row-action-cell">
                      {rowIndex > 0 ? (
                        <button type="button" className="icon-button icon-button-small" onClick={() => removeRow(rowIndex)} aria-label={`Remove row ${rowIndex}`}>
                          <X aria-hidden="true" />
                        </button>
                      ) : <span aria-hidden="true" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-grid-hint">Tip: paste a multi-cell range from Excel, Google Sheets, Numbers, or LibreOffice into any cell.</p>
        </div>

        <div className="table-generator-pane table-output-pane">
          <div className="table-output-header">
            <div className="tool-tabs" role="tablist" aria-label="Table output">
              {(['markdown', 'preview'] as OutputTab[]).map((tab, index) => (
                <button
                  key={tab}
                  ref={(element) => { tabsRef.current[index] = element; }}
                  type="button"
                  role="tab"
                  id={`table-output-tab-${tab}`}
                  aria-controls={`table-output-panel-${tab}`}
                  aria-selected={activeTab === tab}
                  tabIndex={activeTab === tab ? 0 : -1}
                  className={activeTab === tab ? 'is-active' : ''}
                  onClick={() => setActiveTab(tab)}
                  onKeyDown={(event) => handleTabKey(event, index)}
                >
                  {tab === 'markdown' ? 'Markdown' : 'Preview'}
                </button>
              ))}
            </div>
            <button type="button" className="tool-button tool-button-primary" onClick={copyMarkdown} data-testid="copy-markdown">
              <Clipboard aria-hidden="true" />
              Copy Markdown
            </button>
          </div>

          <div
            id="table-output-panel-markdown"
            role="tabpanel"
            aria-labelledby="table-output-tab-markdown"
            hidden={activeTab !== 'markdown'}
            className="table-output-panel"
          >
            {output.markdown ? (
              <textarea className="markdown-source-output" readOnly value={output.markdown} aria-label="Generated Markdown" data-testid="markdown-output" />
            ) : (
              <div className="table-output-empty">Generated Markdown will appear here when the table is valid.</div>
            )}
          </div>
          <div
            id="table-output-panel-preview"
            role="tabpanel"
            aria-labelledby="table-output-tab-preview"
            hidden={activeTab !== 'preview'}
            className="table-output-panel table-preview-panel"
          >
            {output.html ? (
              <div className="prose table-preview" data-testid="table-preview" dangerouslySetInnerHTML={{ __html: output.html }} />
            ) : (
              <div className="table-output-empty">The rendered preview will appear when valid Markdown is available.</div>
            )}
          </div>

          <div className="table-output-actions">
            <button type="button" className="tool-button" onClick={downloadMarkdown}>
              <Download aria-hidden="true" />
              Download .md
            </button>
            <button type="button" className="tool-button" onClick={openInViewer} data-testid="open-in-viewer">
              Open in Markdown Viewer
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className={error || output.error ? 'table-generator-status is-error' : 'table-generator-status'} aria-live="polite" data-testid="table-generator-status">
        {error ?? output.error ?? status}
      </div>
    </section>
  );
}
