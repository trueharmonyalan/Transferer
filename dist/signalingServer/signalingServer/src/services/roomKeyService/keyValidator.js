import { db } from "@db/index";
export class DbKeyCheckClass {
    async dbKeyCheck(key) {
        const isDbHasKey = db
            .prepare(`SELECT key From keymanager
      WHERE key = ? and status = ?`)
            .get(key, "active");
        console.log(isDbHasKey, key);
        if (isDbHasKey) {
            return true;
        }
        return false;
    }
}
