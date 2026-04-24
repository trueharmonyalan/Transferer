import express from "express";
import { ENV } from "./lib/projectManagement/env.js";
import { createRoomRoute } from "./routes/roomRoutes/createRoomRoute.js";
import { joinRoomRoute } from "./routes/roomRoutes/joinRoomRoute.js";
import { migrate } from "@db/migration.js";
import { ws } from "@websocket/ws";
const app = express();
app.use(express.json());
migrate();
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ success: true, greeting: "server is running." });
});
// endpoint helps to create key and room,
app.use("/create", createRoomRoute);
// endpoint helps to receive key and helps to join with room
app.use("/join", joinRoomRoute);
console.log(ws);
app.listen(ENV.PORT, () => {
    console.log(`Server is running on ${ENV.PORT}`);
});
