import express from "express";
import dotenv from "dotenv";
import Connectdb from "./db/db.js"
import app from "./app.js"
dotenv.config();
// First connect to database then start server
Connectdb().then(
  ()=>{
    app.listen(3000,()=>console.log("server is running on port 3000"));
  }
)


