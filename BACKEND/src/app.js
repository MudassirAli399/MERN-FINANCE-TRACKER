import express from "express";
import router from "./routes/user.route.js"
import cors from "cors"

const app = express();


app.use(cors({
    credentials:true,
    origin:"*"
}))
app.use(express.json({limit : "30kb"}))
app.use(express.urlencoded({limit : "30kb",extended:true}))
app.use(express.static("public"))






app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/user",router)

app.use((err, req, res, next) => {
  console.error("❌ Error caught:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app