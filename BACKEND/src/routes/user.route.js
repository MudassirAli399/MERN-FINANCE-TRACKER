import { Router } from "express";
import registeruser from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.post("/create",registeruser)

export default userRouter