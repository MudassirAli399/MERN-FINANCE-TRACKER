import User from "../models/user.model.js"
import asynchandler from "../utils/Asynchandler.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose"

const registeruser = asynchandler(async (req, res) => {

    console.log("DB NAME:", mongoose.connection.name);
console.log("HOST:", mongoose.connection.host);
    // data collect
    const { Name, Email, Password } = req.body
    // data empty
    if(!Name || !Email || !Password){
      return  res.send(ApiError(400,"All fields are required"))
    }
    // is data available on database
    const user = await User.findOne({Email})
    if(user){
       return res.send(ApiError(400,"User already exist"))
    }
    // save data
    const newuser = await User.create({
        Name,
        Email,
        Password
    })
    // send response
    return res.send(ApiResponse(200,"User created successfully",newuser))
})
export default registeruser