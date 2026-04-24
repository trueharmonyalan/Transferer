import { db } from ".";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
const migrationTablesPath = fileURLToPath(new URL("./migrations", import.meta.url));
const migrationScriptPath = fileURLToPath(new URL("./migrateTable.sql", import.meta.url));
const migrationScript = fs.readFileSync(migrationScriptPath, "utf8");
export const migrate = () => {
    db.exec(migrationScript);
    try {
        const tables = fs.readdirSync(migrationTablesPath);
        tables.forEach((t) => {
            const alreadyExecTables = db
                .prepare(`SELECT mtable FROM migration
        WHERE mtable = ?`)
                .get(t);
            if (alreadyExecTables === undefined) {
                const sqlPath = fileURLToPath(new URL(`./migrations/${t}`, import.meta.url));
                const sql = fs.readFileSync(sqlPath, "utf8");
                db.exec(sql);
                db.prepare(`INSERT INTO migration (mtable) VALUES (?)`).run(t);
                console.log(`executed and migrated table: ${t}`);
            }
            else {
                console.log(`Skipping table ${t}, it is already executed`);
            }
        });
    }
    catch (err) {
        console.log(`error: ${err}`);
    }
};
