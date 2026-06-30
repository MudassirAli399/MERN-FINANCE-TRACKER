import { Router } from "express";
import {addtransaction,showtransaction} from "../controllers/transaction.controller.js"
import verifyjwt from "../middlewares/verifyjwt.middleware.js"




const transRouter = Router()

transRouter
.post("/create",verifyjwt,addtransaction)
.get("/show",verifyjwt,showtransaction)

export default transRouter