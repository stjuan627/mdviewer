CREATE TABLE IF NOT EXISTS share_records (
  id TEXT PRIMARY KEY,
  markdown TEXT NOT NULL,
  view TEXT NOT NULL CHECK (view IN ('article', 'release')),
  snapshot_html TEXT NOT NULL,
  renderer_version TEXT NOT NULL,
  created_at TEXT NOT NULL,
  invalidated_at TEXT,
  schema_version INTEGER NOT NULL DEFAULT 1 CHECK (schema_version = 1)
);

CREATE INDEX IF NOT EXISTS share_records_created_at_idx ON share_records(created_at DESC);
CREATE INDEX IF NOT EXISTS share_records_invalidated_at_idx ON share_records(invalidated_at);
