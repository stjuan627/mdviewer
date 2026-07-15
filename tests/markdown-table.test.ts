import { describe, expect, it } from 'vitest';
import { renderResult } from '@/lib/renderer';
import {
  applyPastedCells,
  generateMarkdownTable,
  normalizeImportedRows,
  parseDelimitedTable,
} from '@/lib/markdown-table';
import type { MarkdownTableModel } from '@/lib/schemas';

describe('Markdown table generation', () => {
  it('generates readable GFM with left, center, and right alignment', () => {
    const markdown = generateMarkdownTable({
      rows: [
        ['Name', 'Status', 'Score'],
        ['Alpha', 'Ready', '98'],
      ],
      alignments: ['left', 'center', 'right'],
    });

    expect(markdown).toBe([
      '| Name  | Status | Score |',
      '| :---- | :----: | ----: |',
      '| Alpha | Ready  |    98 |',
    ].join('\n'));
  });

  it('escapes unescaped pipes once and preserves inline Markdown', () => {
    const model: MarkdownTableModel = {
      rows: [
        ['Value'],
        ['**A|B** and A\\|B'],
      ],
      alignments: ['left'],
    };

    const once = generateMarkdownTable(model);
    const twice = generateMarkdownTable(model);

    expect(once).toContain('**A\\|B** and A\\|B');
    expect(once).not.toContain('A\\\\|B');
    expect(twice).toBe(once);
  });

  it('flattens tabs and embedded newlines inside cells', () => {
    const markdown = generateMarkdownTable({
      rows: [['Header'], ['first\tsecond\nthird']],
      alignments: ['left'],
    });

    expect(markdown).toContain('first second third');
    expect(markdown).not.toContain('\t');
  });

  it('renders generated output as a table through renderResult', () => {
    const markdown = generateMarkdownTable({
      rows: [['Header'], ['Cell']],
      alignments: ['left'],
    });
    const rendered = renderResult(markdown);

    expect(rendered.html).toContain('<table>');
    expect(rendered.html).toContain('<th>Header</th>');
  });
});

describe('CSV, TSV, and spreadsheet parsing', () => {
  it('normalizes uneven rows and keeps empty cells', () => {
    const model = normalizeImportedRows([
      ['A', 'B', 'C'],
      ['1'],
      ['', '3'],
    ]);

    expect(model.rows).toEqual([
      ['A', 'B', 'C'],
      ['1', '', ''],
      ['', '3', ''],
    ]);
  });

  it('parses quoted CSV values, CRLF, and commas inside cells', () => {
    const model = parseDelimitedTable('Name,Note,Empty\r\nAlpha,"Ready, now",\r\n');

    expect(model.rows).toEqual([
      ['Name', 'Note', 'Empty'],
      ['Alpha', 'Ready, now', ''],
    ]);
  });

  it('auto-detects spreadsheet TSV', () => {
    const model = parseDelimitedTable('Name\tScore\nAlpha\t98');

    expect(model.rows).toEqual([
      ['Name', 'Score'],
      ['Alpha', '98'],
    ]);
  });

  it('accepts an ambiguous single-column import when auto-detection falls back', () => {
    const model = parseDelimitedTable('Name\nAlpha');

    expect(model.rows).toEqual([['Name'], ['Alpha']]);
  });

  it('fills the grid from the selected cell and expands it', () => {
    const model = applyPastedCells(
      { rows: [['A'], ['']], alignments: ['left'] },
      1,
      0,
      '1\t2\n3\t4'
    );

    expect(model.rows).toEqual([
      ['A', ''],
      ['1', '2'],
      ['3', '4'],
    ]);
    expect(model.alignments).toEqual(['left', 'left']);
  });

  it('rejects row, column, cell, and final output limits', () => {
    expect(() => normalizeImportedRows(Array.from({ length: 101 }, () => ['x']))).toThrow('up to 100 rows');
    expect(() => normalizeImportedRows([Array.from({ length: 21 }, () => 'x')])).toThrow('up to 20 columns');
    expect(() => normalizeImportedRows([["x".repeat(2001)]])).toThrow('up to 2,000 characters');
    expect(() =>
      generateMarkdownTable({
        rows: [Array.from({ length: 20 }, () => 'x'.repeat(400)), Array.from({ length: 20 }, () => 'y'.repeat(400))],
        alignments: Array.from({ length: 20 }, () => 'left' as const),
      })
    ).toThrow();
  });
});
