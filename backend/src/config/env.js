import dotenv from "dotenv";
dotenv.config();


export const ENV = {
  PORT: process.env.PORT || 5001,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
  NODE_ENV: process.env.NODE_ENV,
};