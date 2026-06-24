import User from "../models/user.model.js";
import budget from "../models/budget.model.js";
import asynchandler from "../utils/Asynchandler.js";

const createbudget = asynchandler(async (req, res) => {
    // data collect
    // data empty
    // get user id using refresh token
    // is current month set to true
    // calculate remaining days
    // make expiry date
    // save data
    const id = req.id
    return res.send(id)
})

export default createbudget