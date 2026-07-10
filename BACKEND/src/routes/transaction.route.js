import { Router } from "express";

import {addtransaction,showtransaction,SearchTransaction} from "../controllers/transaction.controller.js"
import verifyjwt from "../middlewares/verifyjwt.middleware.js"




const transRouter = Router()

transRouter
.post("/create",verifyjwt,addtransaction)
.get("/show",verifyjwt,showtransaction)
.post("/search",verifyjwt,SearchTransaction)

export default transRouter