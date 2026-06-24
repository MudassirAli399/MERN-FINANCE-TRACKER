import asynchandler from "../utils/Asynchandler.js"
import ApiError from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
const verifyjwt = asynchandler(async(req,res,next)=>{
    const accesstoken = req.cookies?.accesstoken || false
    if(!accesstoken){
        return res.send(ApiError(400,"You are not logged in"))
    }
    const decodetoken = jwt.verify(accesstoken,process.env.JWT_SECRET)
    req.id = decodetoken.id 
    next()
})

export default verifyjwt