import express from "express";
import { keyValidtorController } from "signalingServer/src/controllers/roomController/keyValidatorController";
import { DbKeyCheckClass } from "signalingServer/src/services/roomKeyService/keyValidator";

export const joinRoomRoute = express.Router();
joinRoomRoute.post("/key", keyValidtorController(new DbKeyCheckClass()));
