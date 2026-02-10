import express from "express";

const app = express();
const port = 8001;

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(port, () => {
  `Server is running on ${port}`;
});
