import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";
const dbPath = fileURLToPath(new URL("./app.db", import.meta.url));
export const db = new Database(dbPath);
db.pragma("journal_mode=WAL");
db.pragma("foreign_keys=ON");
