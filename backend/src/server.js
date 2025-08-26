import express from "express";
import { ENV } from "./config/env.js";
const app = express();

const port =ENV.PORT;
console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));