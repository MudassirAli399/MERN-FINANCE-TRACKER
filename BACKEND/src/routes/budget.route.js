import { Router } from "express";
import { createbudget , showbudget} from "../controllers/budget.controller.js"
import verifyjwt from "../middlewares/verifyjwt.middleware.js"

const budgetrouter = Router()

budgetrouter
.post("/create",verifyjwt,createbudget)
.get("/show",verifyjwt,showbudget)

export default budgetrouter