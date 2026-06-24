import { Router } from "express";
import createbudget from "../controllers/budget.controller.js"
import verifyjwt from "../middlewares/verifyjwt.middleware.js"

const budgetrouter = Router()

budgetrouter.get("/create",verifyjwt,createbudget)

export default budgetrouter