import express from "express";
import { ENV } from "./lib/projectManagement/env.js";
import { joinRoomRoute } from "./routes/roomRoutes/joinRoomRoute.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.use("/join", joinRoomRoute);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on ${ENV.PORT}`);
});
