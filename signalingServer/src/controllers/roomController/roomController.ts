import { generateKey } from "signalingServer/src/services/roomKeyService/KeyService.js";
import { RoomKeyResponse } from "@shared/shared.js";
import { db } from "signalingServer/src/lib/db";

export function getRoomKey(req, res) {
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
      console.log("key added");
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

    const response: RoomKeyResponse = {
      key: roomKey,
    };

    return res.json(response);
  } catch (error) {
    return res.json(`error: ${error}`);
  }
}
