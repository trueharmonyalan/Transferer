import { generateKey } from "signalingServer/src/services/roomKeyService/KeyService.js";
import { RoomKeyResponse } from "@shared/shared.js";

export function getRoomKey(req, res) {
  // console.log(typeof req);
  const roomKey = generateKey();

  const response: RoomKeyResponse = {
    key: roomKey,
  };

  return res.json(response);
}
