import express from "express";
import { ENV } from "./config/env.js";
const app = express();
import connectDB from "./config/db.js";
import {clerkMiddleware} from "@clerk/express"
import { functions, inngest } from "./config/inngest.js";
import {serve} from "inngest/express"
connectDB();

const port = ENV.PORT;
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const startServer = async () => {
  try {
    await connectDB();
    if(ENV.NODE_ENV !== "production"){
      app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();

export default app;
