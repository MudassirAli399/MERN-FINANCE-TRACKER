import express from "express";
import userRouter from "./routes/user.route.js"
import budgetrouter from "./routes/budget.route.js";
import transRouter from "./routes/transaction.route.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

const app = express();


app.use(cors({
        origin: "https://mern-finance-tracker-three.vercel.app",
        credentials: true
    }))
app.use(express.json({limit : "30kb"}))
app.use(express.urlencoded({limit : "30kb",extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

console.log("Hello")




app.get("/", (req,res)=>{
    return res.json({
      Mongodb_URl : process.env.MONGODB_URL,
       database:
            mongoose.connection.readyState === 1
                ? "Connected"
                : "Disconnected"
    })
})

app.use("/api/user",userRouter)

app.use("/api/budget",budgetrouter)

app.use("/api/transaction",transRouter)

app.use((err, req, res, next) => {
  console.error("❌ Error caught:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app
