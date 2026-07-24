PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL CHECK(category IN ('staff','police','mechanic','ems')),
  discord_username TEXT NOT NULL,
  discord_id TEXT,
  answers_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pendiente',
  score INTEGER,
  reviewer_notes TEXT,
  submitted_at TEXT NOT NULL,
  reviewed_at TEXT,
  reviewed_by TEXT,
  submitter_ip TEXT
);

CREATE INDEX IF NOT EXISTS idx_applications_category ON applications(category);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  username TEXT NOT NULL,
  ip TEXT NOT NULL,
  user_agent TEXT,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS ip_bindings (
  role TEXT PRIMARY KEY CHECK(role IN ('staff','police','mechanic','ems')),
  ip TEXT NOT NULL,
  bound_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  role TEXT NOT NULL,
  event TEXT NOT NULL,
  ip TEXT NOT NULL,
  user_agent TEXT,
  details TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_created_at ON activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_activity_ip ON activity_logs(ip);
