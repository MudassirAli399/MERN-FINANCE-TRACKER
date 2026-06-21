import { Router } from "express";
import registeruser from "../controllers/user.controller.js"

const router = Router()

router.post("/create",registeruser)

export default router