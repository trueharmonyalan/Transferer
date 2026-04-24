import { generateKey } from "signalingServer/src/services/roomKeyService/KeyService.js";
import { RoomKeyResponse } from "@shared/shared.js";
import { db } from "@db/index.js";

export function getRoomKey(req: any, res: any) {
  const dball = db.prepare(`SELECT * FROM keymanager`).all();
  console.log(dball);
  try {
    const roomKey = generateKey();

    const keyStatus = db
      .prepare(
        `SELECT key, status FROM keymanager
      WHERE key = ? AND status = ?`,
      )
      .get(roomKey, "inactive");

    if (keyStatus === undefined) {
      const keyInsert = db
        .prepare(`INSERT INTO keymanager (key, status) VALUES (?,?)`)
        .run(roomKey, "active");

      const response: RoomKeyResponse = {
        key: roomKey,
      };

      return res.json(response);
    } else {
      const keyUpdate = db
        .prepare(
          `UPDATE keymanager
          SET status = ?
          WHERE key = ? `,
        )
        .run("active", roomKey);
      console.log("status updated");
    }
  } catch (error) {
    return res.json(`error: ${error}`);
  }
}
