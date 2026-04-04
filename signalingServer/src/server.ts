import express from "express";
import { ENV } from "./lib/projectManagement/env.js";
import { createRoomRoute } from "./routes/roomRoutes/createRoomRoute.js";
import { joinRoomRoute } from "./routes/roomRoutes/joinRoomRoute.js";
import { migrate } from "./lib/db/migration.js";

const app = express();

app.use(express.json());

migrate();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ success: true, greeting: "server is running." });
});
// enpoint helps to create key and room,
app.use("/create", createRoomRoute);

// enpoint helps to receive key and helps to join with room
app.use("/join", joinRoomRoute);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on ${ENV.PORT}`);
});
