import express from "express";
import dotenv from "dotenv";
import Connectdb from "./db/db.js"
dotenv.config();
// First connect to database then start server
Connectdb();
const app = express();

app.listen(3000,()=>console.log("server is running on port 3000"));

app.get("/", (req, res) => res.send("Hello World!"));

app.use((err, req, res, next) => {
  console.error("❌ Error caught:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});