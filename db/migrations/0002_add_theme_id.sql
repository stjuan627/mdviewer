ALTER TABLE share_records ADD COLUMN theme_id TEXT NOT NULL DEFAULT 'paper' CHECK (theme_id IN ('paper', 'blueprint', 'nocturne'));
