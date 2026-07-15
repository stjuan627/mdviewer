import Papa from 'papaparse';
import { MAX_MARKDOWN_LENGTH } from '@/lib/constants';
import {
  MARKDOWN_TABLE_LIMITS,
  markdownTableModelSchema,
  normalizeMarkdown,
  renderRequestSchema,
  type MarkdownTableAlignment,
  type MarkdownTableModel,
} from '@/lib/schemas';

export type TableImportDelimiter = 'auto' | 'comma' | 'tab';

export const DEFAULT_MARKDOWN_TABLE: MarkdownTableModel = {
  rows: [
    ['Name', 'Status', 'Score'],
    ['Alpha', 'Ready', '98'],
    ['Beta', 'In review', '87'],
  ],
  alignments: ['left', 'center', 'right'],
};

function normalizeCell(value: string) {
  return value.replace(/[\t\r\n]+/g, ' ');
}

function escapePipes(value: string) {
  let escaped = '';

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];

    if (character !== '|') {
      escaped += character;
      continue;
    }

    let precedingBackslashes = 0;
    for (let cursor = index - 1; cursor >= 0 && value[cursor] === '\\'; cursor -= 1) {
      precedingBackslashes += 1;
    }

    escaped += precedingBackslashes % 2 === 0 ? '\\|' : '|';
  }

  return escaped;
}

export function normalizeTableCell(value: string) {
  return escapePipes(normalizeCell(value));
}

function delimiterFor(alignment: MarkdownTableAlignment, width: number) {
  if (alignment === 'center') {
    return `:${'-'.repeat(Math.max(3, width - 2))}:`;
  }

  if (alignment === 'right') {
    return `${'-'.repeat(Math.max(3, width - 1))}:`;
  }

  return `:${'-'.repeat(Math.max(3, width - 1))}`;
}

function padCell(value: string, width: number, alignment: MarkdownTableAlignment, header: boolean) {
  if (!header && alignment === 'right') {
    return value.padStart(width, ' ');
  }

  return value.padEnd(width, ' ');
}

export function generateMarkdownTable(model: MarkdownTableModel) {
  const parsed = markdownTableModelSchema.parse(model);
  const normalizedRows = parsed.rows.map((row) => row.map(normalizeTableCell));
  const widths = parsed.alignments.map((alignment, columnIndex) => {
    const contentWidth = Math.max(...normalizedRows.map((row) => row[columnIndex].length));
    const delimiterWidth = alignment === 'center' ? 5 : 4;
    return Math.max(contentWidth, delimiterWidth);
  });

  const lines = normalizedRows.map((row, rowIndex) =>
    `| ${row
      .map((cell, columnIndex) => padCell(cell, widths[columnIndex], parsed.alignments[columnIndex], rowIndex === 0))
      .join(' | ')} |`
  );
  const delimiterRow = `| ${parsed.alignments
    .map((alignment, columnIndex) => delimiterFor(alignment, widths[columnIndex]))
    .join(' | ')} |`;

  lines.splice(1, 0, delimiterRow);
  const markdown = normalizeMarkdown(lines.join('\n'));
  renderRequestSchema.parse({ markdown });
  return markdown;
}

function firstIssueMessage(error: { issues: Array<{ message: string }> }) {
  return error.issues[0]?.message ?? 'The table data is invalid.';
}

export function normalizeImportedRows(rows: string[][]): MarkdownTableModel {
  if (rows.length > MARKDOWN_TABLE_LIMITS.maxRows) {
    throw new Error(`A table can contain up to ${MARKDOWN_TABLE_LIMITS.maxRows} rows.`);
  }

  const columnCount = Math.max(0, ...rows.map((row) => row.length));
  if (columnCount > MARKDOWN_TABLE_LIMITS.maxColumns) {
    throw new Error(`A table can contain up to ${MARKDOWN_TABLE_LIMITS.maxColumns} columns.`);
  }
  if (columnCount < 1) {
    throw new Error('Paste at least one column of table data.');
  }

  const rectangularRows = rows.map((row) => [
    ...row.map((cell) => String(cell)),
    ...Array.from({ length: columnCount - row.length }, () => ''),
  ]);
  if (rectangularRows.length === 1) {
    rectangularRows.push(Array.from({ length: columnCount }, () => ''));
  }

  const result = markdownTableModelSchema.safeParse({
    rows: rectangularRows,
    alignments: Array.from({ length: columnCount }, () => 'left'),
  });

  if (!result.success) {
    throw new Error(firstIssueMessage(result.error));
  }

  return result.data;
}

export function parseDelimitedTable(input: string, delimiter: TableImportDelimiter = 'auto') {
  const normalizedInput = input.replace(/\r\n/g, '\n');
  if (!normalizedInput.trim()) {
    throw new Error('Paste CSV or tab-separated data to import.');
  }

  const explicitDelimiter = delimiter === 'comma' ? ',' : delimiter === 'tab' ? '\t' : undefined;
  const parsed = Papa.parse<string[]>(normalizedInput, {
    delimiter: explicitDelimiter,
    skipEmptyLines: false,
  });

  const fatalErrors = parsed.errors.filter((parserError) => parserError.code !== 'UndetectableDelimiter');
  if (fatalErrors.length > 0) {
    const parserError = fatalErrors[0];
    const rowLabel = typeof parserError.row === 'number' ? ` on row ${parserError.row + 1}` : '';
    throw new Error(`Could not import the data${rowLabel}: ${parserError.message}`);
  }

  const rows = parsed.data.map((row) => row.map((cell) => String(cell)));
  if (rows.length > 1 && rows.at(-1)?.every((cell) => cell === '') && normalizedInput.endsWith('\n')) {
    rows.pop();
  }

  const model = normalizeImportedRows(rows);
  const markdown = generateMarkdownTable(model);
  if (markdown.length > MAX_MARKDOWN_LENGTH) {
    throw new Error(`The generated Markdown can contain up to ${MAX_MARKDOWN_LENGTH.toLocaleString()} characters.`);
  }

  return model;
}

export function applyPastedCells(
  model: MarkdownTableModel,
  startRow: number,
  startColumn: number,
  clipboardText: string
) {
  const parsed = Papa.parse<string[]>(clipboardText.replace(/\r\n/g, '\n'), {
    delimiter: '\t',
    skipEmptyLines: false,
  });
  if (parsed.errors.length > 0) {
    throw new Error(parsed.errors[0].message);
  }

  const pastedRows = parsed.data;
  if (pastedRows.length > 1 && pastedRows.at(-1)?.every((cell) => cell === '') && clipboardText.endsWith('\n')) {
    pastedRows.pop();
  }

  const requiredRows = Math.max(model.rows.length, startRow + pastedRows.length);
  const pastedColumnCount = Math.max(0, ...pastedRows.map((row) => row.length));
  const requiredColumns = Math.max(model.alignments.length, startColumn + pastedColumnCount);

  if (requiredRows > MARKDOWN_TABLE_LIMITS.maxRows) {
    throw new Error(`A table can contain up to ${MARKDOWN_TABLE_LIMITS.maxRows} rows.`);
  }
  if (requiredColumns > MARKDOWN_TABLE_LIMITS.maxColumns) {
    throw new Error(`A table can contain up to ${MARKDOWN_TABLE_LIMITS.maxColumns} columns.`);
  }

  const rows = Array.from({ length: requiredRows }, (_, rowIndex) =>
    Array.from({ length: requiredColumns }, (_, columnIndex) => model.rows[rowIndex]?.[columnIndex] ?? '')
  );

  pastedRows.forEach((row, pastedRowIndex) => {
    row.forEach((cell, pastedColumnIndex) => {
      rows[startRow + pastedRowIndex][startColumn + pastedColumnIndex] = cell;
    });
  });

  return markdownTableModelSchema.parse({
    rows,
    alignments: [
      ...model.alignments,
      ...Array.from({ length: requiredColumns - model.alignments.length }, () => 'left' as const),
    ],
  });
}
