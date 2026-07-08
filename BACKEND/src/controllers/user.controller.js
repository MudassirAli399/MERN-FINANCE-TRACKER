import User from "../models/user.model.js"
import asynchandler from "../utils/Asynchandler.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/Email.js";

const registeruser = asynchandler(async (req, res) => {

  
    // data collect
    const { Name, Email, Password } = req.body

    // data empty
    console.log(req.body)

    if(!Name || !Email || !Password){
      return res.send(ApiError(400,"All fields are required"))
    }

    // is data available on database
    const user = await User.findOne({Email})

    if(user){
       return res.send(ApiError(409,"User already exist"))
    }

    // save data
    const newuser = await User.create({
        Name,
        Email,
        Password
    })
     const accesstoken = await newuser.generateaccesstoken()
    const refreshtoken = await newuser.generaterefreshtoken()
   
    // send response
    return res
    .cookie("accesstoken",accesstoken,{httpOnly:true,secure: true,
    sameSite: "None"})
    .cookie("refreshtoken",refreshtoken,{httpOnly:true, secure: true,
    sameSite: "None"})
    .send(ApiResponse(201,"User created successfully",newuser))
})


const loginuser = asynchandler(async (req, res) => {

    // data collect
    const { Email, Password } = req.body

    // data empty
    if(!Email || !Password){
      return res.send(ApiError(400,"All fields are required"))
    }

    // is data available on database
    const user = await User.findOne({Email})

    if(!user){
       return res.send(ApiError(404,"User not found"))
    }

    // check password
    const isPasswordMatched = await user.comparePassword(Password)

    if(!isPasswordMatched){
        return res.send(ApiError(401,"Password is incorrect"))
    }

    // generate token
    const accesstoken = await user.generateaccesstoken()
    const refreshtoken = await user.generaterefreshtoken()

    return res
    .cookie("accesstoken",accesstoken,{httpOnly:true, secure: true,
    sameSite: "None"})
    .cookie("refreshtoken",refreshtoken,{httpOnly:true, secure: true,
    sameSite: "None"})
    .send(ApiResponse(200,"User logged in successfully",user))

})


const EmailVerifier = asynchandler(async (req,res)=>{

  // get Email
  console.log(req.body)

  const {verifyEmail} = req.body

  if(!verifyEmail){
    return res.send(ApiResponse(400,"NOT RECIEVED EMAIL",{}))
  }

  const user = await User.findOne({
        Email: verifyEmail
    });

  if(user){

    const otp = Math.floor(
        100000 + Math.random()*900000
    ).toString();

    // expiry after 5 min
    const expiry = new Date(
        Date.now() + 5*60*1000
    );

    user.OTP = otp;
    user.OTPExpiry = expiry;

    await user.save();
    await sendEmail(verifyEmail,otp);

    return res.send(ApiResponse(200,"found"))
  }
  else{
    return res.send(ApiResponse(404,"Not found"))
  }

})


const OTPVerifier = asynchandler(async (req,res)=>{

    const {VerifyOTP} = req.body

    if(!VerifyOTP){
        return res.send(ApiResponse(400,"NOT RECIEVED OTP",{}))
    }

    const user = await User.findOne({
        OTP:VerifyOTP
    })

    if(!user){
        return res.send(ApiResponse(404,"Not found"))
    }

    const expired = user.OTPExpiry < Date.now();

    if(expired){
        return res.send(ApiError(410,"OTP Expired"))
    }

    if(user){
        return res.send(ApiResponse(200,"found"))
    }
    else{
        return res.send(ApiResponse(404,"Not found"))
    }

})


const UpdatePassword = asynchandler(async (req,res)=>{

    const {NewPassword,Email} = req.body

    if(!NewPassword){
        return res.send(ApiResponse(400,"NOT RECIEVED PASSWORD",{}))
    }

    const user = await User.findOne({
        Email
    })

    if(user){

        user.Password = NewPassword

        await user.save()

        return res.send(ApiResponse(200,"Update"))
    }
    else{
        return res.send(ApiResponse(404,"Not found"))
    }

})

export {
    registeruser,
    loginuser,
    EmailVerifier,
    OTPVerifier,
    UpdatePassword
}
