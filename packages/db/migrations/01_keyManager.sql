CREATE TABLE IF NOT EXISTS keymanager (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL,
    status TEXT CHECK (status IN ('active','inactive'))
)
