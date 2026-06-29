import { Router } from "express";
import {registeruser,loginuser,EmailVerifier,OTPVerifier,UpdatePassword} from "../controllers/user.controller.js"

const userRouter = Router()

userRouter
.post("/create",registeruser)
.post("/login",loginuser)
.post("/verifyemail",EmailVerifier)
.post("/verifyotp",OTPVerifier)
.post("/updatepassword",UpdatePassword)

export default userRouter