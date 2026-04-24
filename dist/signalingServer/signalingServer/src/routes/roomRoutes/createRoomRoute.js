import express from "express";
import { getRoomKey } from "signalingServer/src/controllers/roomController/roomController.js";
export const createRoomRoute = express.Router();
createRoomRoute.get("/key", getRoomKey);
