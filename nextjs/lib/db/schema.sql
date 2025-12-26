CREATE TABLE IF NOT EXISTS broadcasts (
  id SERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  role TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  duration_hours INTEGER NOT NULL,
  organizer_logo_s3_path TEXT,
  game_icon_path TEXT NOT NULL,
  details TEXT,
  vod_url TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_broadcasts_start_date ON broadcasts(start_date DESC);
