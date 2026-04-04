import Database from "better-sqlite3";

const dbPath = new URL("./app.db", import.meta.url);

export const db = new Database(dbPath.pathname);
db.pragma("journal_mode=WAL");
db.pragma("foreign_keys=ON");
