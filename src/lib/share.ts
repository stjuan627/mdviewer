import { SHARE_SCHEMA_VERSION } from '@/lib/constants';
import { renderResult } from '@/lib/renderer';
import { DEFAULT_THEME_ID, type ThemeId } from '@/lib/themes';

export type ShareRecord = {
  id: string;
  markdown: string;
  snapshotHtml: string;
  themeId: ThemeId;
  rendererVersion: string;
  createdAt: string;
  invalidatedAt: string | null;
  schemaVersion: number;
};

export function buildShareRecord(input: { id: string; markdown: string; themeId: ThemeId; createdAt?: string }): ShareRecord {
  const rendered = renderResult(input.markdown);

  return {
    id: input.id,
    markdown: input.markdown,
    snapshotHtml: rendered.html,
    themeId: input.themeId,
    rendererVersion: rendered.rendererVersion,
    createdAt: input.createdAt ?? new Date().toISOString(),
    invalidatedAt: null,
    schemaVersion: SHARE_SCHEMA_VERSION,
  };
}

export async function insertShareRecord(db: D1Database, record: ShareRecord) {
  await db
    .prepare(
      `INSERT INTO share_records (id, markdown, theme_id, view, snapshot_html, renderer_version, created_at, invalidated_at, schema_version)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
    )
    .bind(
      record.id,
      record.markdown,
      record.themeId,
      'article',
      record.snapshotHtml,
      record.rendererVersion,
      record.createdAt,
      record.invalidatedAt,
      record.schemaVersion,
    )
    .run();
}

export async function getShareRecord(db: D1Database, id: string) {
  const result = await db
    .prepare(
      `SELECT id, markdown, theme_id, view, snapshot_html, renderer_version, created_at, invalidated_at, schema_version
       FROM share_records
       WHERE id = ?1
       LIMIT 1`
    )
    .bind(id)
    .first<{
      id: string;
      markdown: string;
      theme_id: string | null;
      snapshot_html: string;
      renderer_version: string;
      created_at: string;
      invalidated_at: string | null;
      schema_version: number;
    }>();

  if (!result) {
    return null;
  }

  return {
    id: result.id,
    markdown: result.markdown,
    snapshotHtml: result.snapshot_html,
    themeId: (result.theme_id ?? DEFAULT_THEME_ID) as ThemeId,
    rendererVersion: result.renderer_version,
    createdAt: result.created_at,
    invalidatedAt: result.invalidated_at,
    schemaVersion: result.schema_version,
  } satisfies ShareRecord;
}
