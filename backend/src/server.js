import express from "express";
import { ENV } from "./config/env.js";
const app = express();
import connectDB from "./config/db.js";
import {clerkMiddleware} from "@clerk/express"
import { functions, inngest } from "./config/inngest.js";
import {serve} from "inngest/express"
connectDB();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB connection failed:", err));

// ✅ For local dev: run app.listen()
if (ENV.NODE_ENV !== "production") {
  const port = ENV.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
  });
}

export default app;
