import express from "express";
import { ENV } from "./lib/projectManagement/env.js";

const app = express();
// const port = 8001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on ${ENV.PORT}`);
});
