import express from "express";
import { ENV } from "./config/env.js";
const app = express();
import connectDB from "./config/db.js";

connectDB();

const port = ENV.PORT;
console.log(port);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));