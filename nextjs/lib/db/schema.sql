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

-- User pseudonyms table (auto-generated based on IP)
CREATE TABLE IF NOT EXISTS user_pseudonyms (
  id SERIAL PRIMARY KEY,
  ip_hash VARCHAR(64) NOT NULL UNIQUE,
  pseudonym VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_user_pseudonyms_ip_hash ON user_pseudonyms(ip_hash);

-- Chat messages table for live IRC-like chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  anonymous_user_id VARCHAR(255) NOT NULL,
  pseudonym VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  ip_hash VARCHAR(64),
  timestamp TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_ip_hash ON chat_messages(ip_hash, timestamp DESC);
