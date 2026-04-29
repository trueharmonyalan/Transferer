import { app, server } from "./httpServer.js"
import "./websockets/ws.js"
import { json, urlencoded } from "express"
import { ENV } from "./lib/projectManagement/env.js";
import { createRoomRoute } from "./routes/roomRoutes/createRoomRoute.js";
import { joinRoomRoute } from "./routes/roomRoutes/joinRoomRoute.js";
import { migrate } from "@db/migration.js";




app.use(json());

migrate();

app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ success: true, greeting: "server is running." });
});
// endpoint helps to create key and room,
app.use("/create", createRoomRoute);

// endpoint helps to receive key and helps to join with room
app.use("/join", joinRoomRoute);

server.listen(ENV.PORT, () => {
  console.log(`Server is running on ${ENV.PORT}`);
});

