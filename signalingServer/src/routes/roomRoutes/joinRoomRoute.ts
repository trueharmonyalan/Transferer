import express from "express";
import { getRoomKey } from "signalingServer/src/controllers/roomController/roomController.js";

export const joinRoomRoute = express.Router();

joinRoomRoute.get("/key", getRoomKey);
