import { keyValidator } from "@shared/shared";
import { db } from "@db/index";

export class DbKeyCheckClass implements keyValidator {
  async dbKeyCheck(key: string): Promise<boolean> {
    const isDbHasKey = db
      .prepare(
        `SELECT key From keymanager
      WHERE key = ? and status = ?`,
      )
      .get(key, "active");
    console.log(isDbHasKey, key);
    if (isDbHasKey) {
      return true;
    }

    return false;
  }
}
