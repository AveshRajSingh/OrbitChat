import express from "express";
import { ENV } from "./config/env.js";
const app = express();
import connectDB from "./config/db.js";
import {clerkMiddleware} from "@clerk/express"
import { functions, inngest } from "./config/inngest.js";
import {serve} from "inngest/express"
import chatRoutes from "./route/chat.routes.js";
import cors from "cors";

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({origin:[ "http://localhost:5173","https://orbit-chat-jet.vercel.app"], credentials: true}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);



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
