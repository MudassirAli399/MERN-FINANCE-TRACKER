import budget from "../models/budget.model.js";
import asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createbudget = asynchandler(async (req, res) => {
    // data collect
    const { StartNow,items } = req.body
    // data empty
    if(!items){
      return  res.send(ApiError(400,"All fields are required"))
    }
    // get user id using jwt
    const Id = req.id
    // is budget available
    // is current month set to true
    
    let expiryDate= new Date()
    if(StartNow==false){
            const today = new Date();

            expiryDate = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                0
);
    }
    // calculate remaining days
    else{
         

        expiryDate.setMonth(expiryDate.getMonth() + 1);
        
        
        console.log(expiryDate);
    }
    // make expiry date
    // user create
    const user = await budget.create({
        UserId : Id,
        Items : items,
        expirydate : expiryDate,
        latest : false
    })
    // save data
   if(user){
    return res.send(ApiResponse(200,"Budget created successfully",user))
   }    
})

const showbudget = asynchandler(async(req,res)=>{
    const budgetToBeSent = await budget.find({UserId : req.id,latest : true})
    if(budgetToBeSent){
        return res.send(ApiResponse(200,"Budget found",budgetToBeSent))
    }else{
        return res.send(ApiError(400,"Budget not found"))
    }
})

export  {createbudget,showbudget}